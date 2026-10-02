import styles from "./Header.module.css";

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>

                {/* Logo */}
                <div className={styles.logo}>
                    <div className={styles.logoIcon}>
                        M
                    </div>

                    <span>Mi Biblioteca</span>
                </div>

                {/* Navegación */}
                <nav className={styles.nav}>
                    <a href="#" className={`${styles.navLink} ${styles.active}`}>
                        Inicio
                    </a>

                    <a href="#" className={styles.navLink}>
                        Películas
                    </a>

                    <a href="#" className={styles.navLink}>
                        Series
                    </a>

                    <a href="#" className={styles.navLink}>
                        Libros
                    </a>

                    <a href="#" className={styles.navLink}>
                        Videojuegos
                    </a>
                </nav>

                {/* Perfil */}
                <div className={styles.profile}>
                    <div className={styles.avatar}>
                        U
                    </div>

                    <div className={styles.profileInfo}>
                        <span className={styles.profileName}>
                            Usuario
                        </span>

                        <span className={styles.profileRole}>
                            Mi biblioteca
                        </span>
                    </div>
                </div>

            </div>
        </header>
    );
}

export default Header;