import { useState } from "react";
import TarjetaContenido from "../TarjetaContenido/TarjetaContenido";
import Estadisticas from "../Estadisticas/Estadisticas";
import styles from "./Biblioteca.module.css";

function Biblioteca({ contenidos = [], onAgregar }) {

    const manejarEditar = (id) => {
        console.log("Editar contenido:", id);
    };

    const manejarEliminar = (id) => {
        console.log("Eliminar contenido:", id);
    };

    return (
        <main className={styles.biblioteca}>
            <div className={styles.container}>

                {/* ENCABEZADO */}
                <section className={styles.heading}>
                    <div>
                        <span className={styles.eyebrow}>TU COLECCIÓN</span>
                        <h1>Mi Biblioteca</h1>
                        <p>Explora y administra todo tu contenido favorito.</p>
                    </div>

                    <button className={styles.addButton} onClick={onAgregar}>
                        <span>+</span> Agregar Contenido
                    </button>
                </section>

                {/* ESTADÍSTICAS (reemplazan los filtros) */}
                <Estadisticas contenidos={contenidos} />

                {/* TÍTULO */}
                <section className={styles.collectionHeader}>
                    <div>
                        <h2>Biblioteca</h2>
                        <p>
                            {contenidos.length} contenido
                            {contenidos.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                </section>

                {/* ESTADO VACÍO O GRID */}
                {contenidos.length === 0 ? (
                    <section className={styles.emptyState}>
                        <div className={styles.emptyIcon}>📚</div>
                        <h2>Tu biblioteca está vacía</h2>
                        <p>¡Agrega tu primera película, serie, libro o videojuego!</p>
                        <button className={styles.emptyButton} onClick={onAgregar}>
                            + Agregar Contenido
                        </button>
                    </section>
                ) : (
                    <section className={styles.grid}>
                        {contenidos.map((item) => (
                            <TarjetaContenido
                                key={item.id}
                                item={item}
                                onEditar={manejarEditar}
                                onEliminar={manejarEliminar}
                            />
                        ))}
                    </section>
                )}

            </div>
        </main>
    );
}

export default Biblioteca;