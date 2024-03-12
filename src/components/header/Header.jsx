import { Link } from 'react-router-dom';

import styles from './Header.module.css'

import { useApi } from '../../core/hooks/useApi.js';
import { useModal } from '../../core/hooks/useModal.js';
import { useAuthContext } from '../../core/hooks/useAuthContext.js';
import { clientRoutes } from '../../core/environments/clientRoutes.js';
import { serverEndpoints } from '../../core/environments/serverEndpoints.js';

import Modal from '../modal/Modal.jsx';
import Loader from '../loader/Loader.jsx';
import AlertError from '../alerts/AlertError.jsx';

function Header() {
    const [isShownModal, toggleModal] = useModal();

    const { getName, isLoggedIn, clearLocalStorageData } = useAuthContext();
    const { isLoading, error, closeErrorAlertHandler, put: serverPutRequest } = useApi();

    const logoutHandler = () => {                                                                       // Use to logout user
        serverPutRequest(serverEndpoints.logout);                                                       // Send request to the server to logout
        clearLocalStorageData();                                                                        // Clear local storage
        toggleModal();                                                                                  // Close modal
    };

    return (
        <>
            <header className={styles.header}>
                {isLoading && <Loader />}
                {error && <AlertError message={error.message} close={closeErrorAlertHandler} />}
                <div className={styles.header__logo}>
                    <Link to={clientRoutes.catalog}>
                        <img src="/assets/logo.png" alt="Logo" />
                    </Link>
                </div>
                <div className={styles.header__content}>
                    <div className={styles.header__user}>
                        {isLoggedIn ? (
                            <div className={styles.user__mr}>
                                <img
                                    src="/assets/profileLogged.png"
                                    alt="Logged Image"
                                    title="Click to logout"
                                    onClick={toggleModal}
                                />
                                <p className={styles.user__bold}>Hi, {getName && getName.split(' ').at(0)}</p>
                            </div>
                        ) : (
                            <>
                                <Link className={styles.user__mr} to={clientRoutes.login}>
                                    <img
                                        src="/assets/profileNotLogged.png"
                                        alt="Not Logged Image"
                                    />
                                    <p>Log in</p>
                                </Link>
                            </>
                        )}
                    </div>

                    <div className={styles.header__button}>
                        <Link to={clientRoutes.addCar}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                <g id="Group_19449" data-name="Group 19449" transform="translate(11491 23911)">
                                    <path id="Union_1" data-name="Union 1" d="M8,18V10H0V8H8V0h2V8h8v2H10v8Z" transform="translate(-11491 -23911)" />
                                </g>
                            </svg>
                            <span>Add listing</span>
                        </Link>
                    </div>
                </div >
            </header>

            {isShownModal && (
                <Modal
                    title="User logout"
                    buttonText="Logout"
                    toggleModal={toggleModal}
                    modalHandler={logoutHandler}
                    backdrop={false}
                >
                    Are you sure you want to logout {getName && getName.split(' ').at(0)}?
                </Modal>
            )}
        </>
    );
}

export default Header;