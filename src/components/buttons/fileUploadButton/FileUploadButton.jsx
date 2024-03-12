import { useCallback, useMemo, } from 'react';

import styles from './FileUploadButton.module.css';

import { carFormKeys } from '../../../pages/cars/inputValidationCarService.js';

function FileUploadButton({ onChange, mainPhotoError, additionalPhotosError, onDeleteImage, formValues }) {
    const handleDeleteMainPhoto = useCallback((index) => {                                              // Function to handle deletion of main photo
        onDeleteImage(carFormKeys.mainPhoto, index);                                                    // Call onDeleteImage function from useForm hook
    }, []);
    
    const handleDeleteAdditionalPhoto = useCallback((index) => {                                        // Function to handle deletion of additional photos
        onDeleteImage(carFormKeys.additionalPhotos, index);                                             // Call onDeleteImage function from useForm hook
    }, []);

    const isMainPhotoEmpty = useMemo(() => {                                                            // Memoized function to check if the main photo is empty
        return formValues[carFormKeys.mainPhoto]?.length === 0;
    }, [formValues[carFormKeys.mainPhoto]]);

    const isAdditionalPhotoUploaded = useMemo(() => {                                                   // Memoized function to check if the additional photos are empty
        return formValues[carFormKeys.additionalPhotos]?.length !== 0;
    }, [formValues[carFormKeys.additionalPhotos]]);

    const getFilename = useCallback((fileName) => {                                                     // Function to extract filename
        if (!fileName) {
            return '';
        }

        const filenameWithoutExtension = fileName.split('.').slice(0, -1).join('.');                    // Get the filename without extension
        return filenameWithoutExtension;
    }, []);

    const getExtension = useCallback((fileName) => {                                                    // Function to extract extension
        if (!fileName) {
            return '';
        }

        const extension = fileName.split('.').pop();                                                    // Get the file extension
        return `.${extension}`;
    }, []);

    return (
        <div className={styles.form__photos}>
            <h2>Photos</h2>
            <div className={styles.form__photo__wrapper}>
                {/* Main photo */}
                {isMainPhotoEmpty
                    ? (
                        <div className={styles.form__control}>
                            <label htmlFor="mainPhoto" className={styles.form__label}>Main photo</label>
                            <input
                                id="mainPhoto"
                                type="file"
                                accept=".jpg, .jpeg, .png, .gif"
                                className={`${styles.form__input} ${styles.input__photo}`}
                                name={carFormKeys.mainPhoto}
                                onChange={onChange}
                            />
                            {mainPhotoError && <p className={styles.form__error}>{mainPhotoError}</p>}
                        </div>
                    ) : (
                        <div className={styles.form__control}>
                            <p className={styles.uploaded__label}>Main photo</p>
                            <div className={styles.uploaded__button}>
                                <p>
                                    <span className={styles.button__filename}>{getFilename(formValues[carFormKeys.mainPhoto]?.[0]?.name)}</span>
                                    <span className={styles.button__extension}>{getExtension(formValues[carFormKeys.mainPhoto]?.[0]?.name)}</span>
                                    <svg
                                        onClick={() => handleDeleteMainPhoto(0)}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 25.456 25.456"
                                    >
                                        <g id="Group_19449" data-name="Group 19449" transform="translate(25032.994 8794.995) rotate(-45)">
                                            <path id="Union_1" data-name="Union 1" d="M8,18V10H0V8H8V0h2V8h8v2H10v8Z" transform="translate(-11491 -23911)" fill="#eb1d6c" />
                                        </g>
                                    </svg>
                                </p>
                            </div>
                        </div>
                    )
                }

                {/* Additional photos */}
                <div className={styles.form__control}>
                    <label htmlFor="additionalPhotos" className={styles.form__label}>Additional photos</label>
                    <input
                        id="additionalPhotos"
                        type="file"
                        accept=".jpg, .jpeg, .png, .gif"
                        multiple
                        className={`${styles.form__input} ${styles.input__photo}`}
                        name={carFormKeys.additionalPhotos}
                        onChange={onChange}
                    />
                    {additionalPhotosError && <p className={styles.form__error}>{additionalPhotosError}</p>}
                </div>
                {isAdditionalPhotoUploaded && (
                    <div className={styles.additional__uploaded__files}>
                        {formValues[carFormKeys.additionalPhotos].map((file, index) => (
                            <div key={index} className={`${styles.uploaded__button} ${styles.uploaded__button__mobile}`}>
                                <p>
                                    <span className={styles.button__filename}>{getFilename(file?.name)}</span>
                                    <span className={styles.button__extension}>{getExtension(file?.name)}</span>
                                    <svg
                                        onClick={() => handleDeleteAdditionalPhoto(index)}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 25.456 25.456"
                                    >
                                        <g id="Group_19449" data-name="Group 19449" transform="translate(25032.994 8794.995) rotate(-45)">
                                            <path id="Union_1" data-name="Union 1" d="M8,18V10H0V8H8V0h2V8h8v2H10v8Z" transform="translate(-11491 -23911)" fill="#eb1d6c" />
                                        </g>
                                    </svg>
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default FileUploadButton;