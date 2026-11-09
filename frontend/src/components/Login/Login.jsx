import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onLogin({ email, password });
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Inicia sesión</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          type="email"
          name="email"
          placeholder="Correo electrónico"
          required
          value={email}
          onChange={handleEmailChange}
        />
        <input
          className="auth__input"
          type="password"
          name="password"
          placeholder="Contraseña"
          required
          minLength="8"
          value={password}
          onChange={handlePasswordChange}
        />
        <button className="auth__button" type="submit">
          Inicia sesión
        </button>
      </form>
      <Link className="auth__link" to="/signup">
        ¿Aún no eres miembro? Regístrate aquí
      </Link>
    </section>
  );
}
