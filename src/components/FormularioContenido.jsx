function FormularioContenido() {
  return (
    <section className="formulario">

      <h2>➕ Agregar contenido</h2>

      <form>

        <div className="campo">
          <label>Nombre</label>

          <input
            type="text"
            placeholder="Ej. Stranger Things"
          />
        </div>

        <div className="campo">
          <label>Tipo</label>

          <select>
            <option value="pelicula">🎬 Película</option>
            <option value="serie">📺 Serie</option>
            <option value="libro">📖 Libro</option>
            <option value="videojuego">🎮 Videojuego</option>
          </select>
        </div>

        <div className="campo">
          <label>Género</label>

          <input
            type="text"
            placeholder="Ej. Ciencia ficción"
          />
        </div>

        <div className="campo">
          <label>Calificación</label>

          <select>
            <option value="1">⭐ 1</option>
            <option value="2">⭐⭐ 2</option>
            <option value="3">⭐⭐⭐ 3</option>
            <option value="4">⭐⭐⭐⭐ 4</option>
            <option value="5">⭐⭐⭐⭐⭐ 5</option>
          </select>
        </div>

        <div className="campo">
          <label>Estado</label>

          <select>
            <option value="pendiente">Pendiente</option>
            <option value="progreso">En progreso</option>
            <option value="terminado">Terminado</option>
          </select>
        </div>

        <button type="submit" className="boton-agregar">
          Agregar contenido
        </button>

      </form>

    </section>
  );
}

export default FormularioContenido;