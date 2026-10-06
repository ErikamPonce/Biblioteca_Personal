import { useState } from "react";
import { supabase } from "../lib/supabase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function iniciarSesion(e) {
    e.preventDefault();

    setMensaje("");

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setMensaje("Correo electrónico o contraseña incorrectos.");
      return;
    }

    setMensaje("Inicio de sesión correcto");
  }

  return (
    <section className="login-page">
      <div className="login-container">

        {/* Encabezado */}
        <div className="login-logo">
          <div className="logo-icon">B</div>

          <h1>Biblioteca Personal</h1>

          <p>
            Tu espacio para organizar todo lo que disfrutas
          </p>
        </div>

        {/* Tarjeta de Login */}
        <div className="login-card">

          <h2>Iniciar sesión</h2>

          <p className="login-description">
            Ingresa a tu biblioteca personal
          </p>

          <form onSubmit={iniciarSesion}>

            {/* Correo */}
            <div className="input-group">

              <label htmlFor="email">
                Correo electrónico
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                required
              />

            </div>

            {/* Contraseña */}
            <div className="input-group">

              <label htmlFor="password">
                Contraseña
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
              />

            </div>

            {/* Mensaje */}
            {mensaje && (
              <div
                className={
                  mensaje === "Inicio de sesión correcto"
                    ? "login-success"
                    : "login-error"
                }
              >
                {mensaje}
              </div>
            )}

            {/* Botón */}
            <button
              type="submit"
              className="login-button"
            >
              Iniciar sesión
            </button>

          </form>
        </div>

        <p className="login-footer">
          Biblioteca Personal
        </p>

      </div>
    </section>
  );
}

export default Login;