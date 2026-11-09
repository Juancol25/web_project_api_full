import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import api from "../utils/api.js";
import * as auth from "../utils/auth.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

const TOKEN_KEY = "jwt";
const REGISTER_SUCCESS_MESSAGE = "¡Correcto! Ya estás registrado.";
const AUTH_ERROR_MESSAGE =
  "Uy, algo salió mal. Por favor, inténtalo de nuevo.";

const closedTooltip = { isOpen: false, isSuccess: false, message: "" };

export default function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(
    () => localStorage.getItem(TOKEN_KEY) || ""
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(Boolean(token));
  const [tooltip, setTooltip] = useState(closedTooltip);

  // Comprueba el JWT guardado: al montar la aplicación y cuando cambia el token.
  useEffect(() => {
    if (!token) {
      return;
    }

    auth
      .checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setEmail(user.email);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error(error);
        localStorage.removeItem(TOKEN_KEY);
        setToken("");
      })
      .finally(() => setIsCheckingToken(false));
  }, [token]);

  // Con una sesión activa se piden las tarjetas.
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    api
      .getInitialCards(token)
      .then((cardsData) => setCards(cardsData))
      .catch((error) => console.error(error));
  }, [isLoggedIn, token]);

  function openTooltip(isSuccess, message) {
    setTooltip({ isOpen: true, isSuccess, message });
  }

  function handleCloseTooltip() {
    const shouldGoToSignin = tooltip.isSuccess;

    setTooltip(closedTooltip);

    if (shouldGoToSignin) {
      navigate("/signin");
    }
  }

  function handleRegister({ email: userEmail, password }) {
    return auth
      .register(userEmail, password)
      .then(() => openTooltip(true, REGISTER_SUCCESS_MESSAGE))
      .catch((error) => {
        console.error(error);
        openTooltip(false, AUTH_ERROR_MESSAGE);
      });
  }

  function handleLogin({ email: userEmail, password }) {
    return auth
      .authorize(userEmail, password)
      .then((data) => {
        if (!data.token) {
          throw new Error("La respuesta no incluye un token");
        }

        localStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
      })
      .catch((error) => {
        console.error(error);
        openTooltip(false, AUTH_ERROR_MESSAGE);
      });
  }

  function handleSignOut() {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
    setIsLoggedIn(false);
    setEmail("");
    setCurrentUser({});
    setCards([]);
    setPopup(null);
    setSelectedCard(null);
    navigate("/signin");
  }

  function handleOpenPopup(popupName) {
    setPopup(popupName);
  }

  function handleClosePopup() {
    setPopup(null);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setPopup("imagePopup");
  }

  function handleCardLike(card) {
    const isLiked =
      Boolean(card.likes) && card.likes.includes(currentUser._id);

    api
      .changeLikeCardStatus(token, card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((error) => console.error(error));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(token, card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((error) => console.error(error));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(token, data)
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  function handleUpdateUser(data) {
    api
      .updateUserInfo(token, data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  function handleUpdateAvatar(data) {
    api
      .updateAvatar(token, data.avatar)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          email={email}
          onSignOut={handleSignOut}
        />
        {!isCheckingToken && (
          <Routes>
            <Route
              path="/signup"
              element={
                isLoggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Register onRegister={handleRegister} />
                )
              }
            />
            <Route
              path="/signin"
              element={
                isLoggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Main
                    cards={cards}
                    popup={popup}
                    selectedCard={selectedCard}
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={<Navigate to={isLoggedIn ? "/" : "/signin"} replace />}
            />
          </Routes>
        )}
        <Footer />
        <InfoTooltip
          isOpen={tooltip.isOpen}
          isSuccess={tooltip.isSuccess}
          message={tooltip.message}
          onClose={handleCloseTooltip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
