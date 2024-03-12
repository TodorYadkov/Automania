import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Register.module.css';

import { useApi } from '../../../core/hooks/useApi.js';
import { useForm } from '../../../core/hooks/useForm.js';
import { useAuthContext } from '../../../core/hooks/useAuthContext.js';
import { emailPattern } from '../../../core/environments/constants.js';
import { clientRoutes } from '../../../core/environments/clientRoutes.js';
import { serverEndpoints } from '../../../core/environments/serverEndpoints.js';
import { inputValidationUserService, userFormKeys } from '../inputValidationUserService.js';

import Loader from '../../../components/loader/Loader.jsx';
import AlertError from '../../../components/alerts/AlertError.jsx';

function Register() {
    const [isShownPassword, setIsShownPassword] = useState(false);                                      // State to toggle password visibility

    const navigate = useNavigate();
    const { addLocalStorageData } = useAuthContext();
    const { isLoading, error, closeErrorAlertHandler, data: serverData, post: servePostRequest } = useApi();

    useEffect(() => {
        if (serverData && serverData?.payload?.emailExists === undefined) {
            addLocalStorageData(serverData);                                                            // When user is created add to local storage
            formReset();                                                                                // Reset form input fields
            navigate(clientRoutes.catalog, { replace: true });                                          // Redirect to catalog
        }

    }, [serverData, addLocalStorageData]);


    const onSubmitHandler = (userInputData) => {                                                        // Function to handle form submission
        servePostRequest(serverEndpoints.register, userInputData);                                      // Create user on server
    };

    const { formValues, formErrorMessage, isInvalidForm, onChange, onBlur, onFocus, onSubmit, formReset } = useForm(
        onSubmitHandler,
        inputValidationUserService,
        {
            [userFormKeys.email]: '',
            [userFormKeys.fullName]: '',
            [userFormKeys.password]: '',
        }
    );

    const onBlurHandler = (e) => {                                                                      // Function to validate email on the server             
        const emailValue = formValues[userFormKeys.email];                                              // Get email
        if ((emailValue !== '') && emailPattern.test(emailValue)) {                                     // Check if the email is not empty and is correct to send request
            servePostRequest(serverEndpoints.userCheck, { email: formValues[userFormKeys.email] });     // Use to check if current email exist on server
        }

        onBlur(e);
    };

    const showPasswordHandler = () => setIsShownPassword(!isShownPassword);                             // Function to toggle password visibility

    return (
        <section className={styles.register__section}>
            {error && (
                <div className={styles.form__alert}>
                    <AlertError message={error.message} close={closeErrorAlertHandler} />
                </div>
            )}
            <div className={styles.register__bgc}>
                {/* Main background image */}
                <img src="/assets/backgroundLogin.png" alt="Register background" />
                {/* Overlay image */}
                <img src="/assets/backgroundLoginDark.svg" alt="Overlay image" className={styles.overlay__image} />
            </div>
            <div className={styles.register__content}>
                <header className={styles.register__header}>
                    <div className={styles.header__logo}>
                        <Link to={clientRoutes.catalog}>
                            <img src="/assets/logoLogin.svg" alt="Logo image" />
                        </Link>
                    </div>
                    <h1 className={styles.header__title}>Join our catalog</h1>
                </header>

                <form onSubmit={onSubmit} className={styles.register__form}>
                    {/* Email */}
                    <div className={styles.form__control}>
                        <label htmlFor="email" className={styles.form__label}>Email</label>
                        <input
                            id="email"
                            type="email"
                            className={styles.form__input}
                            name={userFormKeys.email}
                            onChange={onChange}
                            onBlur={onBlurHandler}
                            onFocus={onFocus}
                            value={formValues[userFormKeys.email]}
                        />
                        {formErrorMessage.email && <p className={styles.form__error}>{formErrorMessage.email}</p>}
                        {serverData?.payload?.emailExists && <p className={styles.form__error}>Email is already taken</p>}
                    </div>

                    {/* Full name */}
                    <div className={styles.form__control}>
                        <label htmlFor="fullName" className={styles.form__label}>Full name</label>
                        <input
                            id="fullName"
                            type="text"
                            className={styles.form__input}
                            name={userFormKeys.fullName}
                            onChange={onChange}
                            onBlur={onBlur}
                            onFocus={onFocus}
                            value={formValues[userFormKeys.fullName]}
                        />
                        {formErrorMessage.fullName && <p className={styles.form__error}>{formErrorMessage.fullName}</p>}
                    </div>

                    {/* Password */}
                    <div className={styles.form__control}>
                        <label htmlFor="password" className={styles.form__label}>Password</label>
                        <input
                            id="password"
                            type={isShownPassword ? "text" : "password"}
                            className={styles.form__input}
                            name={userFormKeys.password}
                            onChange={onChange}
                            onBlur={onBlur}
                            onFocus={onFocus}
                            value={formValues[userFormKeys.password]}
                        />
                        <img
                            src={isShownPassword ? "/assets/viewShown.svg" : "/assets/view.svg"}
                            alt="Show password"
                            className={styles.input__svg}
                            onClick={showPasswordHandler}
                        />
                        {formErrorMessage.password && <p className={styles.form__error}>{formErrorMessage.password}</p>}
                    </div>

                    <div className={styles.form__actions}>
                        {isLoading ? (
                            <div className={styles.form__loader}><Loader height="32px" /></div>
                        ) : (
                            <button disabled={isInvalidForm}>Register</button>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Register;
