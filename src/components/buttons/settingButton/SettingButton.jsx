import styles from './SettingButtonButton.module.css';

function SettingButton({ toggle }) {

    return (
        <button
            className={styles.button}
            onClick={toggle}
        >
            <img src="/assets/setting.png" alt="Setting icon" />
            <span>Manage</span>
        </button>
    );
}

export default SettingButton;