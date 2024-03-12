import styles from './Loader.module.css';

function Loader({ width = 'auto', height = 'auto' }) {

    return (
        <div className={styles.loader}>
            <img
                src="/assets/spinner.png"
                alt="Loading image"
                className={styles.loader__rotate}
                width={width}
                height={height}
            />
        </div>
    );
}

export default Loader;