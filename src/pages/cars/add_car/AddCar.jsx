import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './AddCar.module.css';

import { useApi } from '../../../core/hooks/useApi.js';
import { useForm } from '../../../core/hooks/useForm.js';
import { useCarContext } from '../../../core/hooks/useCarContext.js';
import { clientRoutes } from '../../../core/environments/clientRoutes.js';
import { serverEndpoints } from '../../../core/environments/serverEndpoints.js';
import { carFormKeys, inputValidationCarService } from '../inputValidationCarService.js';

import Loader from '../../../components/loader/Loader.jsx';
import AlertError from '../../../components/alerts/AlertError.jsx';
import FileUploadButton from '../../../components/buttons/fileUploadButton/FileUploadButton.jsx';

function AddCar() {
    const formRef = useRef(null);

    const navigate = useNavigate();
    const { addNewCar: addNewCarContext, incrementCarsCount } = useCarContext();

    const { post: uploadFiles, isLoading: isLoadingUpload, error: uploadError, closeErrorAlertHandler: closeUploadError } = useApi();
    const { post: createCar, isLoading: isLoadingCar, error: carError, closeErrorAlertHandler: closeCarError } = useApi();

    const onSubmitHandler = async (formInputData) => {
        try {
            // Declare an object to keep track of the state of the image
            const serverUploadedImages = { mainPhoto: [], additionalPhotos: [] };

            // Step 1: Upload main photo file
            const formDataMainPhotoForUpload = new FormData();
            // Append mainPhoto
            formDataMainPhotoForUpload.append('images', formInputData[carFormKeys.mainPhoto][0]);
            // Send request to the server with main photo
            const mainPhotoUploadResponse = await uploadFiles(serverEndpoints.uploadImage, formDataMainPhotoForUpload);
            // Set main photo URL
            serverUploadedImages.mainPhoto = mainPhotoUploadResponse.payload[0].url;

            // Step 2: Upload additional photo files if available
            if (formInputData[carFormKeys.additionalPhotos].length !== 0) {
                const formDataAdditionalPhotosForUpload = new FormData();
                // Append additionalPhotos
                formInputData[carFormKeys.additionalPhotos].forEach(file => formDataAdditionalPhotosForUpload.append('images', file));
                // Send request to the server with image files
                const additionalPhotosUploadResponse = await uploadFiles(serverEndpoints.uploadImage, formDataAdditionalPhotosForUpload);
                // Store the newly uploaded photo URLs
                serverUploadedImages.additionalPhotos = additionalPhotosUploadResponse.payload.map(file => file.url);
            }

            // Step 3: Create car
            const carData = {
                brand: formInputData[carFormKeys.brand],
                model: formInputData[carFormKeys.model],
                price: formInputData[carFormKeys.price],
                mainPhoto: serverUploadedImages.mainPhoto,
                additionalPhotos: serverUploadedImages.additionalPhotos
            };

            // Send data to the server to create a new car
            const newCarData = await createCar(serverEndpoints.createCar, carData);
            // Add new car to CarContext and increment count of all cars
            addNewCarContext(newCarData.payload);
            incrementCarsCount();
            // Reset form values to initial state
            formReset();
            // Navigate to catalog
            navigate(clientRoutes.catalog, { replace: true });
        } catch (error) {
            console.error('Error creating car:', error);
        }
    };

    // Custom hook to handle form
    const { formValues, formErrorMessage, isInvalidForm, onChange, onBlur, onFocus, onSubmit, formReset, onDeleteImage } = useForm(
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

    return (
        <section className={styles.section}>
            {(uploadError || carError) && (
                <div className={styles.form__alert}>
                    <AlertError message={uploadError ? uploadError.message : carError.message} close={uploadError ? closeUploadError : closeCarError} />
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
                    <h1>New listing</h1>
                </div>

                {(isLoadingUpload || isLoadingCar)
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
                {/* Image upload component */}
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

export default AddCar;