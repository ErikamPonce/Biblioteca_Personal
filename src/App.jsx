import { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header/Header";
import Biblioteca from "./components/Biblioteca/Biblioteca";
import FormularioContenido from "./components/Formulario/FormularioContenido";
import Login from "./components/Login";
import { supabase } from "./lib/supabase";

function App() {
  const [sesion, setSesion] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [contenidos, setContenidos] = useState([]);
  const [contenidoEditando, setContenidoEditando] = useState(null);

  // Cargar contenidos desde Supabase
  const cargarContenidos = async (userId) => {
    const { data, error } = await supabase
      .from("contenidos")
      .select("*")
      .eq("usuario_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error al cargar contenidos:", error);
      return;
    }

    setContenidos(data || []);
  };

  useEffect(() => {
    // Revisar sesión existente
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSesion(session);

      if (session?.user) {
        cargarContenidos(session.user.id);
      }
    });

    // Detectar cambios de sesión
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSesion(session);

      if (session?.user) {
        cargarContenidos(session.user.id);
      } else {
        setContenidos([]);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Agregar contenido
  const handleAgregarContenido = (nuevoContenido) => {
    setContenidos((prev) => [nuevoContenido, ...prev]);
    setMostrarFormulario(false);
    setContenidoEditando(null);
  };

  // Eliminar contenido
  const handleEliminarContenido = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que quieres eliminar este contenido?"
    );

    if (!confirmar) {
      return;
    }

    const { error } = await supabase
      .from("contenidos")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error al eliminar:", error);
      alert("No se pudo eliminar el contenido.");
      return;
    }

    setContenidos((prev) =>
      prev.filter((contenido) => contenido.id !== id)
    );
  };

  // Abrir formulario para editar
  const handleEditarContenido = (contenido) => {
    setContenidoEditando(contenido);
    setMostrarFormulario(true);
  };

  // Actualizar contenido después de editar
  const handleActualizarContenido = (contenidoActualizado) => {
    setContenidos((prev) =>
      prev.map((contenido) =>
        contenido.id === contenidoActualizado.id
          ? contenidoActualizado
          : contenido
      )
    );

    setContenidoEditando(null);
    setMostrarFormulario(false);
  };

  // Cerrar formulario
  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setContenidoEditando(null);
  };

  // Mostrar Login si no hay sesión
  if (!sesion) {
    return <Login />;
  }

  return (
    <div className="app">
      <Header />

      <main>
        {mostrarFormulario ? (
          <FormularioContenido
            contenidoEditar={contenidoEditando}
            onAgregar={handleAgregarContenido}
            onActualizar={handleActualizarContenido}
            onCerrar={cerrarFormulario}
          />
        ) : (
          <Biblioteca
            contenidos={contenidos}
            onAgregar={() => {
              setContenidoEditando(null);
              setMostrarFormulario(true);
            }}
            onEditar={handleEditarContenido}
            onEliminar={handleEliminarContenido}
          />
        )}
      </main>
    </div>
  );
}

export default App;