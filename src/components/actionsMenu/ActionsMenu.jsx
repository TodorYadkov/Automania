import { Link } from 'react-router-dom';

import styles from './ActionsMenu.module.css';

import { clientRoutes } from '../../core/environments/clientRoutes.js';

function ActionsMenu({ carData, onDeleteHandler }) {

    return (
        <div className={styles.menu__actions}>
            <div className={styles.triangle}></div>
            <div className={styles.content__actions}>
                <Link to={`${clientRoutes.editCarComponentRoute(carData._id)}`}>
                    <p className={styles.actions__edit}>Edit listing</p>
                </Link>

                <div className={styles.divider} />

                <p
                    className={styles.actions__delete}
                    onClick={() => onDeleteHandler(carData)}
                >
                    Delete Listing
                </p>
            </div>
        </div>
    );
}

export default ActionsMenu;