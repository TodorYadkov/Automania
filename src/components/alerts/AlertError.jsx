import styles from './AlertError.module.css'

function AlertError({ message, close }) {

    return (
        <div className={styles.alert__error}>
            <div className={styles.alert__icon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={styles.alert__icon__svg}>
                    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                </svg>

            </div>

            <div className={styles.alert__content}>
                <div className={styles.alert__title}>Error</div>
                <p className={styles.alert__message}>{message}</p>
            </div>

            <div className={styles.alert__close} onClick={close}>
                <svg width="18" height="18" viewBox="0 0 18 18" className={styles.alert__close}>
                    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                </svg>
            </div>
        </div>

    );
}

export default AlertError;

