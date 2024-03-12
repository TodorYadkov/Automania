import styles from './Modal.module.css'

function Modal({ children, title, toggleModal, modalHandler, buttonText, backdrop = true }) {

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {                                                     // Close modal only when is clicked on backdrop
            toggleModal();
        }
    };

    return (
        <div className={styles.modal} onClick={backdrop ? handleBackdropClick : null}>
            <div className={styles.modal__wrapper}>
                <div className={styles.modal__header}>
                    <h4>{title}</h4>
                </div>
                <div className={styles.modal__content}>

                    <p>{children}</p>

                </div>
                <div className={styles.modal__footer}>
                    <button onClick={toggleModal} className={`${styles.footer__button} ${styles.button__close}`}>Go back</button>
                    <button onClick={modalHandler} className={`${styles.footer__button} ${styles.button__action}`}>{buttonText}</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;