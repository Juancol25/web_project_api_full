import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {
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
    onRegister({ email, password });
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Regístrate</h2>
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
          Regístrate
        </button>
      </form>
      <Link className="auth__link" to="/signin">
        ¿Ya eres miembro? Inicia sesión aquí
      </Link>
    </section>
  );
}
