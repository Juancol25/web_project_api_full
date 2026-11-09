import { Link, useLocation } from "react-router-dom";
import logo from "../../images/Vector.svg";

export default function Header({ isLoggedIn, email, onSignOut }) {
  const { pathname } = useLocation();
  const isSignupPage = pathname === "/signup";

  const barClassName = `header__bar${isLoggedIn ? " header__bar_type_logged" : ""}`;

  return (
    <header className="header">
      <div className={barClassName}>
        <img className="header__logo" src={logo} alt="Around The U.S." />
        <nav className="header__nav">
          {isLoggedIn ? (
            <>
              <span className="header__email">{email}</span>
              <button
                className="header__button"
                type="button"
                onClick={onSignOut}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link
              className="header__link"
              to={isSignupPage ? "/signin" : "/signup"}
            >
              {isSignupPage ? "Iniciar sesión" : "Regístrate"}
            </Link>
          )}
        </nav>
      </div>
      <div className="header__line"></div>
    </header>
  );
}
