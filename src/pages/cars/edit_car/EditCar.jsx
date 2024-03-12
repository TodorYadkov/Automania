import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './EditCar.module.css';

import { useApi } from '../../../core/hooks/useApi.js';
import { useForm } from '../../../core/hooks/useForm.js';
import { ActionTypes } from '../../../core/reducers/carReducer.js';
import { useCarContext } from '../../../core/hooks/useCarContext.js';
import { clientRoutes } from '../../../core/environments/clientRoutes.js';
import { serverEndpoints } from '../../../core/environments/serverEndpoints.js';
import { carFormKeys, inputValidationCarService } from '../inputValidationCarService.js';

import { transformCarObject } from '../../../util/transformCarObject.js';
import { checkForRemovedPhotos } from '../../../util/checkForRemovedPhotos.js';

import Loader from '../../../components/loader/Loader.jsx';
import AlertError from '../../../components/alerts/AlertError.jsx';
import FileUploadButton from '../../../components/buttons/fileUploadButton/FileUploadButton.jsx';

function EditCar() {
    const [currentCarData, setCurrentCarData] = useState(null);
    const formRef = useRef(null);

    const { carId } = useParams('carId');
    const navigate = useNavigate();

    const { carState: allCars, editCar: editCarContext } = useCarContext();

    const { get: getCarFromServer, isLoading: isLoadingGetCar, error: carGetError, closeErrorAlertHandler: closeCarGetError } = useApi();
    const { post: uploadFiles, isLoading: isLoadingUpload, error: uploadError, closeErrorAlertHandler: closeUploadError } = useApi();
    const { put: updateCar, isLoading: isLoadingEditCar, error: carEditError, closeErrorAlertHandler: closeCarEditError } = useApi();

    useEffect(() => {
        // Check if there are cars available in the state                                                                     
        if (allCars[ActionTypes.ALL_CARS].length !== 0) {
            // If cars are available, find the current car by its ID
            const currentCar = allCars[ActionTypes.ALL_CARS].find(c => c._id === carId);

            // Update the current car data state with the found car
            setCurrentCarData(currentCar);

            // Set initial form values by transforming the car object
            setInitialValues(transformCarObject(currentCar));
        } else {
            // If no cars are available in the state, fetch the car from the server
            getCarFromServer(serverEndpoints.getOneCar(carId))
                .then(serverData => {
                    // Update the current car data state with the fetched car data
                    setCurrentCarData(serverData.payload);

                    // Set initial form values by transforming the fetched car object
                    setInitialValues(transformCarObject(serverData.payload));
                });
        }
    }, []);

    const onSubmitHandler = async (formInputData) => {
        try {
            // Declare an object to keep track of the state of the image
            const serverUploadedImages = { mainPhoto: [], additionalPhotos: [] };

            // Step 1: Upload the main image file if it has been changed
            if (formInputData[carFormKeys.mainPhoto][0] instanceof File) {
                const formDataMainPhotoForUpload = new FormData();
                // Append mainPhoto
                formDataMainPhotoForUpload.append('images', formInputData[carFormKeys.mainPhoto][0]);
                // Send request to the server with main photo
                const mainPhotoUploadResponse = await uploadFiles(serverEndpoints.uploadImage, formDataMainPhotoForUpload);
                // Set main photo URL
                serverUploadedImages.mainPhoto = mainPhotoUploadResponse.payload[0].url;
            } else {
                // If the main photo is not a file get original data
                serverUploadedImages.mainPhoto = currentCarData[carFormKeys.mainPhoto];
            }

            // Step 2: Upload additional photo files if available and if modified
            if (formInputData[carFormKeys.additionalPhotos]?.length !== 0) {
                // Get original url data
                const currentData = currentCarData[carFormKeys.additionalPhotos];
                // Get newly added data
                const newData = formInputData[carFormKeys.additionalPhotos];
                // Check for changes
                const { unchangedData, newFiles } = checkForRemovedPhotos(currentData, newData);
                // If there are new files, send to the server
                if (newFiles.length !== 0) {
                    const formDataAdditionalPhotosForUpload = new FormData();
                    // Append additionalPhotos
                    newFiles.forEach(file => formDataAdditionalPhotosForUpload.append('images', file));
                    // Send request to the server with image files
                    const additionalPhotosUploadResponse = await uploadFiles(serverEndpoints.uploadImage, formDataAdditionalPhotosForUpload);
                    // Store the newly uploaded photo URLs
                    serverUploadedImages.additionalPhotos = additionalPhotosUploadResponse.payload.map(file => file.url);
                }

                // Combine new URLs and old ones
                serverUploadedImages.additionalPhotos = [...unchangedData, ...serverUploadedImages.additionalPhotos];
            }

            // Step 3: Update car
            const carData = {
                brand: formInputData[carFormKeys.brand],
                model: formInputData[carFormKeys.model],
                price: formInputData[carFormKeys.price],
                mainPhoto: serverUploadedImages.mainPhoto,
                additionalPhotos: serverUploadedImages.additionalPhotos,
            };

            // Send data to the server to update a car
            const updatedCar = await updateCar(serverEndpoints.editCar(carId), carData);
            // Update a car in context
            editCarContext(updatedCar.payload);
            // Reset form values to initial state
            formReset();
            // Navigate to catalog
            navigate(clientRoutes.catalog, { replace: true });
        } catch (error) {
            console.error('Error creating car:', error);
        }
    };

    // Custom hook to handle form
    const { formValues, formErrorMessage, isInvalidForm, onChange, onBlur, onFocus, onSubmit, formReset, onDeleteImage, setInitialValues } = useForm(
        onSubmitHandler,
        inputValidationCarService,
        {
            [carFormKeys.brand]: '',
            [carFormKeys.model]: '',
            [carFormKeys.price]: '',
            [carFormKeys.mainPhoto]: '',
            [carFormKeys.additionalPhotos]: [],
        }
    );

    // Because the submit button is outside the form, I use the handleButtonSubmit function to trigger the submit event on the form
    const handleButtonSubmit = () => {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    };

    // Check if the form is valid
    const isDisabledButtonHandler = () => (isInvalidForm || formValues[carFormKeys.mainPhoto]?.length === 0);

    // Navigate to catalog handler
    const navigateToCatalogHandler = useCallback(() => navigate(clientRoutes.catalog, { replace: true }), []);

    // Handle different type of error
    const errorHandler = () => {
        const error = { hasError: false, message: '', closeFn: null };

        if (uploadError) {
            error.hasError = true;
            error.message = uploadError.message;
            error.closeFn = closeUploadError;

        } else if (carEditError) {
            error.hasError = true;
            error.message = carEditError.message;
            error.closeFn = closeCarEditError;

        } else if (carGetError) {
            error.hasError = true;
            error.message = carGetError.message;
            error.closeFn = closeCarGetError;
        }

        return error;
    };

    //  Get error object to check in JSX
    const error = errorHandler();

    // Show the loader and hide all other content if the current car is not in context
    if (isLoadingGetCar) {
        return (<Loader width="50px" height="50px" />);
    }

    return (
        <section className={styles.section}>
            {error.hasError && (
                <div className={styles.form__alert}>
                    <AlertError message={error.message} close={error.closeFn} />
                </div>
            )}

            <header className={styles.section__header}>
                <div className={styles.header__title}>
                    <svg
                        onClick={navigateToCatalogHandler}
                        xmlns="http://www.w3.org/2000/svg"
                        width="25.456"
                        height="25.456"
                        viewBox="0 0 25.456 25.456"
                    >
                        <g id="Group_19454" data-name="Group 19454" transform="translate(25032.994 8794.995) rotate(-45)">
                            <path id="Union_1" data-name="Union 1" d="M8,18V10H0V8H8V0h2V8h8v2H10v8Z" transform="translate(-11491 -23911)" fill="#0c0c21" />
                        </g>
                    </svg>
                    <h1>Edit listing</h1>
                </div>

                {(isLoadingUpload || isLoadingEditCar)
                    ? (
                        <div className={styles.form__loader}><Loader height="32px" /></div>
                    ) : (
                        <button
                            className={styles.form__button}
                            disabled={isDisabledButtonHandler()}
                            onClick={handleButtonSubmit}
                        >
                            Save listing
                        </button>
                    )
                }
            </header>

            <form ref={formRef} onSubmit={onSubmit} className={styles.form} encType="multipart/form-data">
                <h2>General information</h2>

                <div className={styles.form__text__wrapper}>
                    {/* Brand */}
                    <div className={styles.form__control}>
                        <label htmlFor="brand" className={styles.form__label}>Brand</label>
                        <input
                            id="brand"
                            type="text"
                            className={styles.form__input}
                            name={carFormKeys.brand}
                            onChange={onChange}
                            onBlur={onBlur}
                            onFocus={onFocus}
                            value={formValues[carFormKeys.brand]}
                        />
                        {formErrorMessage.brand && <p className={styles.form__error}>{formErrorMessage.brand}</p>}
                    </div>
                    {/* Model */}
                    <div className={styles.form__control}>
                        <label htmlFor="model" className={styles.form__label}>Model</label>
                        <input
                            id="model"
                            type="text"
                            className={styles.form__input}
                            name={carFormKeys.model}
                            onChange={onChange}
                            onBlur={onBlur}
                            onFocus={onFocus}
                            value={formValues[carFormKeys.model]}
                        />
                        {formErrorMessage.model && <p className={styles.form__error}>{formErrorMessage.model}</p>}
                    </div>
                    {/* Price */}
                    <div className={`${styles.form__control} ${styles.form__control__price}`}>
                        <label htmlFor="price" className={styles.form__label}>Price</label>
                        <input
                            id="price"
                            type="number"
                            step="0.01"
                            min="1"
                            className={`${styles.form__input} ${styles.input__price}`}
                            name={carFormKeys.price}
                            onChange={onChange}
                            onBlur={onBlur}
                            onFocus={onFocus}
                            value={formValues[carFormKeys.price]}
                        />
                        {formErrorMessage.price && <p className={styles.form__error}>{formErrorMessage.price}</p>}
                    </div>
                </div>

                <div className={styles.form__divider}></div>

                {
                    <FileUploadButton
                        onChange={onChange}
                        onBlur={onBlur}
                        onFocus={onFocus}
                        mainPhotoError={formErrorMessage.mainPhoto}
                        additionalPhotosError={formErrorMessage.additionalPhotos}
                        onDeleteImage={onDeleteImage}
                        formValues={formValues}
                    />
                }
            </form>
        </section>
    );
}

export default EditCar;