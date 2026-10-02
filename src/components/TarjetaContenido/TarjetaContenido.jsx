import styles from "./TarjetaContenido.module.css";

function TarjetaContenido({ item, onEditar, onEliminar }) {

    // Convertimos la calificación a número
    const calificacion = Number(item.calificacion) || 0;

    // Máximo de 5 estrellas
    const estrellas = Array.from({ length: 5 }, (_, index) => {
        return index < calificacion;
    });

    // Clase para el estado
    const obtenerClaseEstado = () => {
        switch (item.estado?.toLowerCase()) {
            case "pendiente":
                return styles.estadoPendiente;

            case "en progreso":
                return styles.estadoProgreso;

            case "terminado":
                return styles.estadoTerminado;

            default:
                return styles.estadoDefault;
        }
    };

    return (
        <article className={styles.card}>

            {/* 
                PORTADA
             */}

            <div className={styles.cover}>

                <div className={styles.coverContent}>
                    <span className={styles.coverIcon}>
                        {item.tipo === "Película" && "🎬"}
                        {item.tipo === "Serie" && "📺"}
                        {item.tipo === "Libro" && "📖"}
                        {item.tipo === "Videojuego" && "🎮"}
                    </span>

                    <span className={styles.coverTitle}>
                        {item.nombre}
                    </span>
                </div>

                {/* Estado */}
                <span
                    className={`${styles.estado} ${obtenerClaseEstado()}`}
                >
                    {item.estado}
                </span>

            </div>

            {/* 
                INFORMACIÓN
             */}

            <div className={styles.content}>

                <div className={styles.titleRow}>

                    <h3 className={styles.title}>
                        {item.nombre}
                    </h3>

                </div>

                <div className={styles.meta}>

                    <span className={styles.tipo}>
                        {item.tipo}
                    </span>

                    <span className={styles.genero}>
                        {item.genero}
                    </span>

                </div>

                {/* Calificación */}

                <div className={styles.rating}>

                    <div className={styles.stars}>

                        {estrellas.map((llena, index) => (
                            <span
                                key={index}
                                className={
                                    llena
                                        ? styles.starFilled
                                        : styles.starEmpty
                                }
                            >
                                ★
                            </span>
                        ))}

                    </div>

                    <span className={styles.ratingNumber}>
                        {calificacion}/5
                    </span>

                </div>

                {/* Descripción */}

                <p className={styles.description}>
                    {item.descripcion || "Sin descripción disponible."}
                </p>

                {/* 
                    ACCIONES
                 */}

                <div className={styles.actions}>

                    <button
                        className={styles.editButton}
                        onClick={() => onEditar(item.id)}
                    >
                        ✏️
                        <span>Editar</span>
                    </button>

                    <button
                        className={styles.deleteButton}
                        onClick={() => onEliminar(item.id)}
                    >
                        🗑️
                        <span>Eliminar</span>
                    </button>

                </div>

            </div>

        </article>
    );
}

export default TarjetaContenido;