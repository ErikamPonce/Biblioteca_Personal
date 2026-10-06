import { useState } from "react";
import styles from "./Formulario.module.css";
import { supabase } from "../../lib/supabase";

export default function FormularioContenido({
  contenidoEditar,
  onAgregar,
  onActualizar,
  onCerrar,
}) {
  const [formData, setFormData] = useState({
    nombre: contenidoEditar?.nombre || "",
    tipo: contenidoEditar?.tipo || "pelicula",
    genero: contenidoEditar?.genero || "",
    calificacion: String(contenidoEditar?.calificacion || "5"),
    estado: contenidoEditar?.estado || "pendiente",
    descripcion: contenidoEditar?.descripcion || "",
  });

  const [mensaje, setMensaje] = useState("");
  const [guardando, setGuardando] = useState(false);

  const estaEditando = Boolean(contenidoEditar);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre.trim()) {
      setMensaje("Escribe el nombre del contenido.");
      return;
    }

    setMensaje("");
    setGuardando(true);

    // ==========================================
    // EDITAR CONTENIDO
    // ==========================================
    if (estaEditando) {
      const { data, error } = await supabase
        .from("contenidos")
        .update({
          nombre: formData.nombre.trim(),
          tipo: formData.tipo,
          genero: formData.genero.trim(),
          calificacion: Number(formData.calificacion),
          estado: formData.estado,
          descripcion: formData.descripcion.trim(),
        })
        .eq("id", contenidoEditar.id)
        .select()
        .single();

      if (error) {
        console.error("Error al actualizar:", error);
        setMensaje("No se pudo actualizar el contenido.");
        setGuardando(false);
        return;
      }

      console.log("Contenido actualizado:", data);

      if (onActualizar) {
        onActualizar(data);
      }

      setMensaje("Contenido actualizado correctamente.");
      setGuardando(false);

      setTimeout(() => {
        if (onCerrar) {
          onCerrar();
        }
      }, 700);

      return;
    }

    // ==========================================
    // AGREGAR CONTENIDO
    // ==========================================

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMensaje("No hay un usuario iniciado.");
      setGuardando(false);
      return;
    }

    const { data, error } = await supabase
      .from("contenidos")
      .insert([
        {
          usuario_id: user.id,
          nombre: formData.nombre.trim(),
          tipo: formData.tipo,
          genero: formData.genero.trim(),
          calificacion: Number(formData.calificacion),
          estado: formData.estado,
          descripcion: formData.descripcion.trim(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error al guardar:", error);
      setMensaje("No se pudo guardar el contenido.");
      setGuardando(false);
      return;
    }

    console.log("Contenido guardado:", data);

    if (onAgregar) {
      onAgregar(data);
    }

    setFormData({
      nombre: "",
      tipo: "pelicula",
      genero: "",
      calificacion: "5",
      estado: "pendiente",
      descripcion: "",
    });

    setMensaje("Contenido guardado correctamente.");
    setGuardando(false);

    setTimeout(() => {
      if (onCerrar) {
        onCerrar();
      }
    }, 700);
  };

  return (
    <div className={styles.formWrapper}>

      {/* BOTÓN PARA REGRESAR */}
      <button
        type="button"
        className={styles.btnCerrar}
        onClick={onCerrar}
      >
        ← Volver a la Biblioteca
      </button>

      {/* FORMULARIO */}
      <div className={styles.formCard}>
        <form
          onSubmit={handleSubmit}
          className={styles.formBody}
        >
          <div className={styles.formGroup}>
            <label>Nombre</label>

            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej. Stranger Things"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Tipo</label>

            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
            >
              <option value="pelicula">
                Película
              </option>

              <option value="serie">
                Serie
              </option>

              <option value="libro">
                Libro
              </option>

              <option value="videojuego">
                Videojuego
              </option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Género</label>

            <input
              type="text"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              placeholder="Ej. Ciencia ficción"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Calificación</label>

            <select
              name="calificacion"
              value={formData.calificacion}
              onChange={handleChange}
            >
              <option value="1">⭐ 1</option>
              <option value="2">⭐ 2</option>
              <option value="3">⭐ 3</option>
              <option value="4">⭐ 4</option>
              <option value="5">⭐ 5</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Estado</label>

            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
            >
              <option value="pendiente">
                Pendiente
              </option>

              <option value="en_progreso">
                En progreso
              </option>

              <option value="completado">
                Completado
              </option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Descripción</label>

            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Añade una breve descripción o reseña..."
              rows="3"
            />
          </div>

          {/* MENSAJE */}
          {mensaje && (
            <p
              style={{
                color: mensaje.includes("correctamente")
                  ? "#86efac"
                  : "#fca5a5",
                marginTop: "10px",
              }}
            >
              {mensaje}
            </p>
          )}

          {/* BOTÓN */}
          <button
            type="submit"
            className={styles.btnSubmit}
            disabled={guardando}
          >
            {guardando
              ? "Guardando..."
              : estaEditando
              ? "Guardar cambios"
              : "Agregar contenido"}
          </button>
        </form>
      </div>
    </div>
  );
}