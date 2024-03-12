import styles from './Layout.module.css';

import Header from '../header/Header.jsx';

function Layout({ children }) {

    return (
        <div className={styles.layout__main}>
            <Header />
            <main className={styles.container}>
                {children}
            </main>
        </div>
    );
}

export default Layout;