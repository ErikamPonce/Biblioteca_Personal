import "./App.css";
import FormularioContenido from "./components/FormularioContenido";

function App() {
  return (
    <div className="app">

      <header className="header">
        <h1>📚 Mi Biblioteca de Entretenimiento</h1>

        <p>
          Organiza tus películas, series, libros y videojuegos
        </p>
      </header>

      <main className="container">

        <section className="welcome">
          <h2>Bienvenido a tu biblioteca</h2>

          <p>
            Aquí podrás organizar todo el contenido que quieres
            ver, leer o jugar.
          </p>
        </section>

        <FormularioContenido />

      </main>

    </div>
  );
}

export default App;