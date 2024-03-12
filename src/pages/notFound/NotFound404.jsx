import { Link } from 'react-router-dom';

import styles from './NotFound404.module.css'

import { clientRoutes } from '../../core/environments/clientRoutes.js';

function NotFound404() {

    return (
        <div className={styles.not__found}>
            <h1>Oops! The page you&apos;re looking for seems to be missing.</h1>
            <p>It may have been moved, renamed, or deleted.</p>
            <Link to={clientRoutes.catalog} className={styles.not__found__btn}>Back</Link>
        </div >
    );
}

export default NotFound404;