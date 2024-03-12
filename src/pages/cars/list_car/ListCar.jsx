import { useEffect, useRef, useState } from 'react';

import styles from './ListCar.module.css';

import { useApi } from '../../../core/hooks/useApi.js';
import { useModal } from '../../../core/hooks/useModal.js';
import { ActionTypes } from '../../../core/reducers/carReducer.js';
import { useCarContext } from '../../../core/hooks/useCarContext.js';
import { useAuthContext } from '../../../core/hooks/useAuthContext.js';
import { useInfiniteScroll } from '../../../core/hooks/useInfiniteScroll.js';
import { serverEndpoints } from '../../../core/environments/serverEndpoints.js';

import DeleteCar from '../delete_car/DeleteCar.jsx';
import Loader from '../../../components/loader/Loader.jsx';
import CarCard from '../../../components/carCard/CarCard.jsx';
import AlertError from '../../../components/alerts/AlertError.jsx';
import ActionsMenu from '../../../components/actionsMenu/ActionsMenu.jsx';
import SettingButton from '../../../components/buttons/settingButton/SettingButton.jsx';

function ListCar() {
    const [totalPages, setTotalPages] = useState(0);                                                    // State to store the total number of pages in pagination
    const [selectedCar, setSelectedCar] = useState(null);                                               // State to store the currently selected car
    const [openActionMenuId, setOpenActionMenuId] = useState(null);                                     // State to store the Id of the car that is currently open (actions menu)
    const [isInitialRendering, setIsInitialRendering] = useState(true);                                 // State to track whether the component is initially rendering

    const bottomElementRef = useRef(null);                                                              // Reference to the bottom element for infinite scrolling
    const { page } = useInfiniteScroll(bottomElementRef, initialHandler);                               // Custom hook to handle infinite scrolling and trigger initial data fetching

    const { getUserId: currentUserId } = useAuthContext();
    const { post: servePostRequest, closeErrorAlertHandler, isLoading, error, data: allCars } = useApi();
    const { carState, setAllCars: setAllCarsContext, addAllCarsCount: addAllCarsCountContext } = useCarContext();

    const [isShownDeleteComponent, toggleDeleteComponent] = useModal();                                 // Show or hide delete modal

    useEffect(() => {                                                                                   // Use to fetch data from the server when page is changed
        if ((totalPages === 0 || totalPages >= page) && !isInitialRendering) {                          // Load data only when pages are available
            loadCars();
        }

    }, [page, totalPages, isInitialRendering]);

    useEffect(() => {
        if (allCars) {
            const uniqueId = new Set(carState[ActionTypes.ALL_CARS].map((car) => car._id));             // To make sure I only show unique cars, I keep the old ID state
            const uniqueCars = allCars.payload.docs.filter((car) => !uniqueId.has(car._id));            // If the old ID is in the current server response, I don't add it to the current state
            setAllCarsContext([...carState[ActionTypes.ALL_CARS], ...uniqueCars]);                      // Update car state with new car
            setTotalPages(allCars.payload.totalPages);                                                  // Set total pages from the server
            addAllCarsCountContext(allCars.payload.totalDocs);                                          // Add all cars count to the context
        }

    }, [allCars]);

    function initialHandler() {                                                                         // Set initial rendering flag in order to prevent additional request
        setIsInitialRendering(false);
    }

    function loadCars() {                                                                               // Get cars from the server
        servePostRequest(serverEndpoints.getAllCars, addRequestBodyHandler());
    }

    function addRequestBodyHandler(defaultPagesize = 12) {                                              // Prepare body to be sent to the server
        return {
            pageNumber: page,
            pageSize: defaultPagesize,
            sortBy: '',
            noPagination: false
        };
    }

    function onDeleteHandler(carData) {                                                                 // Show or hide delete component
        setSelectedCar(carData);                                                                        // Select current car to be deleted
        toggleDeleteComponent();                                                                        // Close Delete component
        toggleActionsMenu();                                                                            // Close actions menu
    }

    function toggleActionsMenu(carIdOrEvent) {                                                          // Toggle the actions menu for a specific car item
        if (typeof carIdOrEvent === 'object') {                                                         // Handle click event on the backdrop
            setOpenActionMenuId(null);                                                                  // Close the actions menu by setting the openActionMenuId to null
        } else {                                                                                        // Check if the current car ID is already in state
            setOpenActionMenuId(openActionMenuId === carIdOrEvent ? null : carIdOrEvent);               // If current ID is in state set state to null - this close the menu
        }
    }

    return (
        <>
            {openActionMenuId && (<div className={styles.actions__backdrop__overlay} onClick={toggleActionsMenu} />)}
            <section className={styles.section}>
                {error && (
                    <div className={styles.form__alert}>
                        <AlertError message={error.message} close={closeErrorAlertHandler} />
                    </div>
                )}

                <div className={styles.section__heading}>
                    <h1>Car listings ({carState[ActionTypes.ALL_CARS_COUNT]})</h1>
                </div>

                {allCars?.payload?.docs?.length === 0
                    ? (
                        <div className={styles.section__no__cars}>
                            <h2>No cars in collection</h2>
                        </div>
                    ) : (
                        <div className={styles.section__cars}>
                            {carState[ActionTypes.ALL_CARS].map(car => (
                                <div key={car._id} className={styles.card__wrapper}>
                                    <CarCard car={car} />
                                    <div className={styles.actions__menu__position}>

                                        {car.user._id === currentUserId && (
                                            <SettingButton toggle={() => toggleActionsMenu(car._id)} />
                                        )}

                                        {openActionMenuId === car._id && (
                                            <ActionsMenu carData={car} onDeleteHandler={onDeleteHandler} />
                                        )}
                                    </div>
                                </div>
                            ))}

                            <div ref={bottomElementRef} />
                        </div>
                    )
                }

                {isLoading && <Loader height="50px" width="50px" />}
            </section >

            {isShownDeleteComponent && (<DeleteCar carData={selectedCar} toggleComponent={toggleDeleteComponent} />)}
        </>
    );
}

export default ListCar;