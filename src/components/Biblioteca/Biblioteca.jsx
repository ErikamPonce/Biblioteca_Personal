
import { useMemo, useState } from "react";
import TarjetaContenido from "../TarjetaContenido/TarjetaContenido";
import Estadisticas from "../Estadisticas/Estadisticas";

import styles from "./Biblioteca.module.css";

function Biblioteca({
  contenidos = [],
  onAgregar,
  onEditar,
  onEliminar,
}) {
  // Estados para la búsqueda y los filtros
  const [busqueda, setBusqueda] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("");
  const [generoFiltro, setGeneroFiltro] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("");

  const manejarEditar = (id) => {
    const contenido = contenidos.find(
      (item) => item.id === id
    );

    if (contenido && onEditar) {
      onEditar(contenido);
    }
  };

  const manejarEliminar = (id) => {
    if (onEliminar) {
      onEliminar(id);
    }
  };

  // Obtener los géneros registrados sin repetirlos
  const generos = useMemo(() => {
    const unicos = new Map();

    contenidos.forEach((item) => {
      const genero = item.genero?.trim();

      if (genero) {
        const clave = genero.toLocaleLowerCase();

        if (!unicos.has(clave)) {
          unicos.set(clave, genero);
        }
      }
    });

    return [...unicos.values()].sort((a, b) =>
      a.localeCompare(b)
    );
  }, [contenidos]);

  // Aplicar búsqueda y filtros
  const contenidosFiltrados = useMemo(() => {
    return contenidos.filter((item) => {
      const nombre = (item.nombre || "").toLocaleLowerCase();
      const textoBusqueda = busqueda.trim().toLocaleLowerCase();

      const coincideNombre = nombre.includes(textoBusqueda);

      const coincideTipo =
        !tipoFiltro || item.tipo === tipoFiltro;

      const coincideGenero =
        !generoFiltro ||
        (item.genero || "").trim().toLocaleLowerCase() ===
          generoFiltro.toLocaleLowerCase();

      const coincideEstado =
        !estadoFiltro || item.estado === estadoFiltro;

      return (
        coincideNombre &&
        coincideTipo &&
        coincideGenero &&
        coincideEstado
      );
    });
  }, [contenidos, busqueda, tipoFiltro, generoFiltro, estadoFiltro]);

  // Limpiar búsqueda y filtros
  const limpiarFiltros = () => {
    setBusqueda("");
    setTipoFiltro("");
    setGeneroFiltro("");
    setEstadoFiltro("");
  };

  const hayFiltrosActivos =
    busqueda.trim() !== "" ||
    tipoFiltro !== "" ||
    generoFiltro !== "" ||
    estadoFiltro !== "";

  return (
    <main className={styles.biblioteca}>
      <div className={styles.container}>

        {/* ENCABEZADO */}
        <section className={styles.heading}>
          <div>
            <span className={styles.eyebrow}>
              TU COLECCIÓN
            </span>

            <h1>Mi Biblioteca</h1>

            <p>
              Explora y administra todo tu contenido favorito.
            </p>
          </div>

          <button
            className={styles.addButton}
            onClick={onAgregar}
          >
            <span>+</span>
            Agregar Contenido
          </button>
        </section>

        {/* ESTADÍSTICAS GENERALES */}
        <Estadisticas contenidos={contenidos} />

        {/* BUSCADOR Y FILTROS */}
        <section className={styles.searchFilters}>
          <div className={styles.searchBox}>
            <label htmlFor="buscarContenido">
              Buscar por nombre
            </label>

            <input
              id="buscarContenido"
              type="search"
              placeholder="Ej. Stranger Things..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className={styles.filters}>

            {/* FILTRO POR TIPO */}
            <div className={styles.filterGroup}>
              <label htmlFor="filtroTipo">
                Tipo de contenido
              </label>

              <select
                id="filtroTipo"
                value={tipoFiltro}
                onChange={(e) => setTipoFiltro(e.target.value)}
              >
                <option value="">Todos los tipos</option>
                <option value="pelicula">Películas</option>
                <option value="serie">Series</option>
                <option value="libro">Libros</option>
                <option value="videojuego">Videojuegos</option>
              </select>
            </div>

            {/* FILTRO POR GÉNERO */}
            <div className={styles.filterGroup}>
              <label htmlFor="filtroGenero">
                Género
              </label>

              <select
                id="filtroGenero"
                value={generoFiltro}
                onChange={(e) => setGeneroFiltro(e.target.value)}
              >
                <option value="">Todos los géneros</option>

                {generos.map((genero) => (
                  <option key={genero} value={genero}>
                    {genero}
                  </option>
                ))}
              </select>
            </div>

            {/* FILTRO POR ESTADO */}
            <div className={styles.filterGroup}>
              <label htmlFor="filtroEstado">
                Estado
              </label>

              <select
                id="filtroEstado"
                value={estadoFiltro}
                onChange={(e) => setEstadoFiltro(e.target.value)}
              >
                <option value="">Todos los estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="en_progreso">En progreso</option>
                <option value="completado">Completado</option>
              </select>
            </div>
          </div>

          {/* BOTÓN PARA RESTABLECER LOS FILTROS */}
          {hayFiltrosActivos && (
            <button
              type="button"
              className={styles.clearFilters}
              onClick={limpiarFiltros}
            >
              Limpiar búsqueda y filtros
            </button>
          )}
        </section>

        {/* TÍTULO Y CANTIDAD DE RESULTADOS */}
        <section className={styles.collectionHeader}>
          <div>
            <h2>Biblioteca</h2>

            <p>
              Mostrando {contenidosFiltrados.length} de{" "}
              {contenidos.length} contenidos
            </p>
          </div>
        </section>

        {/* BIBLIOTECA VACÍA */}
        {contenidos.length === 0 ? (
          <section className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              📚
            </div>

            <h2>Tu biblioteca está vacía</h2>

            <p>
              ¡Agrega tu primera película, serie,
              libro o videojuego!
            </p>

            <button
              className={styles.emptyButton}
              onClick={onAgregar}
            >
              + Agregar Contenido
            </button>
          </section>

        ) : contenidosFiltrados.length === 0 ? (
          /* SIN RESULTADOS */
          <section className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              🔎
            </div>

            <h2>No se encontraron resultados</h2>

            <p>
              Intenta cambiar el nombre o los filtros seleccionados.
            </p>

            <button
              className={styles.emptyButton}
              onClick={limpiarFiltros}
            >
              Limpiar filtros
            </button>
          </section>

        ) : (
          /* TARJETAS DE CONTENIDO */
          <section className={styles.grid}>
            {contenidosFiltrados.map((item) => (
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