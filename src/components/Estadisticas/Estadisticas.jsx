import styles from './Estadisticas.module.css';

function Estadisticas({ contenidos = [] }) {
  // Calcular estadísticas por tipo
  const totalPeliculas = contenidos.filter((item) => item.tipo === 'Película').length;
  const totalSeries = contenidos.filter((item) => item.tipo === 'Serie').length;
  const totalLibros = contenidos.filter((item) => item.tipo === 'Libro').length;
  const totalVideojuegos = contenidos.filter((item) => item.tipo === 'Videojuego').length;

  // Calcular estadísticas por estado
  const totalPendientes = contenidos.filter((item) => item.estado === 'Pendiente').length;
  const totalEnProgreso = contenidos.filter((item) => item.estado === 'En progreso').length;
  const totalCompletados = contenidos.filter((item) => item.estado === 'Completado').length;

  // Definir las tarjetas de la primera fila (tipos)
  const statsTipo = [
    { id: 'peliculas', icono: '🎬', label: 'Películas', valor: totalPeliculas, color: '#ef4444' },
    { id: 'series', icono: '📺', label: 'Series', valor: totalSeries, color: '#3b82f6' },
    { id: 'libros', icono: '📚', label: 'Libros', valor: totalLibros, color: '#10b981' },
    { id: 'videojuegos', icono: '🎮', label: 'Videojuegos', valor: totalVideojuegos, color: '#a855f7' },
  ];

  // Definir las tarjetas de la segunda fila (estados)
  const statsEstado = [
    { id: 'pendientes', icono: '⏳', label: 'Pendientes', valor: totalPendientes, color: '#f59e0b' },
    { id: 'progreso', icono: '▶️', label: 'En progreso', valor: totalEnProgreso, color: '#06b6d4' },
    { id: 'completados', icono: '✅', label: 'Completados', valor: totalCompletados, color: '#22c55e' },
  ];

  return (
    <section className={styles.estadisticas}>
      {/* Fila 1: Por tipo */}
      <div className={styles.fila}>
        {statsTipo.map((stat) => (
          <div
            key={stat.id}
            className={styles.card}
            style={{ '--accent-color': stat.color }}
          >
            <div className={styles.icono}>{stat.icono}</div>
            <div className={styles.info}>
              <span className={styles.valor}>{stat.valor}</span>
              <span className={styles.label}>{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

       {/* Título de la segunda sección */}
      <h3 className={styles.subtitulo}>Tu Actividad</h3>

      {/* Fila 2: Por estado */}
      <div className={styles.fila}>
        {statsEstado.map((stat) => (
          <div
            key={stat.id}
            className={styles.card}
            style={{ '--accent-color': stat.color }}
          >
            <div className={styles.icono}>{stat.icono}</div>
            <div className={styles.info}>
              <span className={styles.valor}>{stat.valor}</span>
              <span className={styles.label}>{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Estadisticas;