import { useState } from 'react';
import styles from './Formulario.module.css';

export default function FormularioContenido({ onAgregar, onCerrar }) {
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: 'Película',
    genero: '',
    calificacion: '5',
    estado: 'Pendiente',
    descripcion: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim()) return;

    if (onAgregar) onAgregar(formData);

    setFormData({
      nombre: '',
      tipo: 'Película',
      genero: '',
      calificacion: '5',
      estado: 'Pendiente',
      descripcion: ''
    });
  };

  return (
    <div className={styles.formWrapper}>
      
      {/* Botón de volver POR FUERA del formulario */}
      <button 
        type="button" 
        className={styles.btnCerrar} 
        onClick={onCerrar}
      >
        ← Volver a la Biblioteca
      </button>

      {/* Formulario */}
      <div className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.formBody}>
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
            <select name="tipo" value={formData.tipo} onChange={handleChange}>
              <option value="Película">Película</option>
              <option value="Serie">Serie</option>
              <option value="Libro">Libro</option>
              <option value="Videojuego">Videojuego</option>
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
            <select name="calificacion" value={formData.calificacion} onChange={handleChange}>
              <option value="1">⭐ 1</option>
              <option value="2">⭐ 2</option>
              <option value="3">⭐ 3</option>
              <option value="4">⭐ 4</option>
              <option value="5">⭐ 5</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Estado</label>
            <select name="estado" value={formData.estado} onChange={handleChange}>
              <option value="Pendiente">Pendiente</option>
              <option value="En progreso">En progreso</option>
              <option value="Completado">Completado</option>
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

          <button type="submit" className={styles.btnSubmit}>
            Agregar contenido
          </button>
        </form>
      </div>

    </div>
  );
}