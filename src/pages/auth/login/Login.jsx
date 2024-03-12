import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Login.module.css';

import { useApi } from '../../../core/hooks/useApi.js';
import { useForm } from '../../../core/hooks/useForm.js';
import { useAuthContext } from '../../../core/hooks/useAuthContext.js';
import { clientRoutes } from '../../../core/environments/clientRoutes.js';
import { serverEndpoints } from '../../../core/environments/serverEndpoints.js';
import { inputValidationUserService, userFormKeys } from '../inputValidationUserService.js';

import Loader from '../../../components/loader/Loader.jsx';
import AlertError from '../../../components/alerts/AlertError.jsx';

function Login() {
    const [isShownPassword, setIsShownPassword] = useState(false);                                      // State to toggle password visibility

    const navigate = useNavigate();
    const { addLocalStorageData } = useAuthContext();
    const { isLoading, error, closeErrorAlertHandler, data: serverData, post: servePostRequest } = useApi();

    useEffect(() => {
        if (serverData) {
            addLocalStorageData(serverData);                                                            // When serverData is available save in local storage token and name
            formReset();                                                                                // Reset form input fields
            navigate(clientRoutes.catalog, { replace: true });                                          // Redirect to catalog
        }

    }, [serverData, addLocalStorageData]);


    const onSubmitHandler = (userInputData) => {                                                        // Function to handle form submission
        servePostRequest(serverEndpoints.login, userInputData);                                         // Send a request to the server to log in a user
    };

    const { formValues, formErrorMessage, isInvalidForm, onChange, onBlur, onFocus, onSubmit, formReset } = useForm(
        onSubmitHandler,
        inputValidationUserService,
        {
            [userFormKeys.email]: '',
            [userFormKeys.password]: '',
        }
    );

    const showPasswordHandler = () => setIsShownPassword(!isShownPassword);                             // Function to toggle password visibility

    return (
        <section className={styles.login__section}>
            {/* Display error message */}
            {error && (
                <div className={styles.form__alert}>
                    <AlertError message={error.message} close={closeErrorAlertHandler} />
                </div>
            )}
            <div className={styles.login__bgc}>
                {/* Main background image */}
                <img src="/assets/backgroundLogin.png" alt="Login background" />
                {/* Overlay image */}
                <img src="/assets/backgroundLoginDark.svg" alt="Overlay image" className={styles.overlay__image} />
            </div>
            <div className={styles.login__content}>
                <header className={styles.login__header}>
                    <div className={styles.header__logo}>
                        <Link to={clientRoutes.catalog}>
                            <img src="/assets/logoLogin.svg" alt="Logo image" />
                        </Link>
                    </div>
                    <h1 className={styles.header__title}>Welcome back</h1>
                </header>

                {/* Login form */}
                <form onSubmit={onSubmit} className={styles.login__form}>
                    {/* Email input */}
                    <div className={styles.form__control}>
                        <label htmlFor="email" className={styles.form__label}>Email</label>
                        <input
                            id="email"
                            type="email"
                            className={styles.form__input}
                            name={userFormKeys.email}
                            onChange={onChange}
                            onBlur={onBlur}
                            onFocus={onFocus}
                            value={formValues[userFormKeys.email]}
                        />
                        {formErrorMessage.email && <p className={styles.form__error}>{formErrorMessage.email}</p>}
                    </div>

                    {/* Password input */}
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
                        {/* Show/hide password toggle */}
                        <img
                            src={isShownPassword ? "/assets/viewShown.svg" : "/assets/view.svg"}
                            alt="Show password"
                            className={styles.input__svg}
                            onClick={showPasswordHandler}
                        />
                        {formErrorMessage.password && <p className={styles.form__error}>{formErrorMessage.password}</p>}
                    </div>

                    <div className={styles.form__actions}>
                        {/* Display loader while submitting, otherwise display login button */}
                        {isLoading ? (
                            <div className={styles.form__loader}><Loader height="32px" /></div>
                        ) : (
                            <button disabled={isInvalidForm}>Log In</button>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Login;
