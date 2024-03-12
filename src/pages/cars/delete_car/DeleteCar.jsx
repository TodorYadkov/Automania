import { useApi } from '../../../core/hooks/useApi.js';
import { useCarContext } from '../../../core/hooks/useCarContext.js';
import { serverEndpoints } from '../../../core/environments/serverEndpoints.js';

import Modal from '../../../components/modal/Modal.jsx';
import Loader from '../../../components/loader/Loader.jsx';
import AlertError from '../../../components/alerts/AlertError.jsx';

function DeleteCar({ carData, toggleComponent }) {
    const { deleteCar: deleteCarContext, decrementCarsCount } = useCarContext();
    const { delete: deleteCarRequest, isLoading, error, closeErrorAlertHandler } = useApi();

    const onDeleteHandler = async () => {                                                               // Delete car from server
        try {
            const carId = carData._id;                                                                  // Get car Id to be send like a query to the server
            await deleteCarRequest(serverEndpoints.deleteCar(carId));                                   // Send request to the server
            deleteCarContext(carData);                                                                  // Delete car from context
            decrementCarsCount();                                                                       // Reduce the number of cars in the context
            toggleComponent();                                                                          // Close modal
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {isLoading && <Loader height="50px" width="50px" />}
            {error && (<AlertError message={error.message} close={closeErrorAlertHandler} />)}

            <Modal
                title="Delete listing"
                buttonText="Delete"
                toggleModal={toggleComponent}
                modalHandler={onDeleteHandler}
                backdrop={false}
            >
                Are you sure you want to delete this listing from the platform?
            </Modal>
        </>
    );
}

export default DeleteCar;