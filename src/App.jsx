import { useState } from "react";
import "./App.css";

import Header from "./components/Header/Header";
import Biblioteca from "./components/Biblioteca/Biblioteca";
import FormularioContenido from "./components/FormularioContenido";

function App() {

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  //Aqui van los ejemplos de contenido que se van a mostrar en la biblioteca

  return (
    <div className="app">

      {/* Header siempre visible */}
      <Header />

      <main>

        {mostrarFormulario ? (

          <FormularioContenido />

        ) : (

          <Biblioteca
            contenidos={[]} //Se agrega contenidos entre corchetes
            onAgregar={() => setMostrarFormulario(true)}
          />

        )}

      </main>

    </div>
  );
}

export default App;