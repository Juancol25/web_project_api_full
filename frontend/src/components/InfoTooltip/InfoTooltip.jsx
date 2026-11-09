import successIcon from "../../images/tooltip-success.svg";
import errorIcon from "../../images/tooltip-error.svg";

export default function InfoTooltip({ isOpen, isSuccess, message, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup popup_opened">
      <div className="popup__container popup__container_type_tooltip">
        <button
          className="popup__close"
          type="button"
          aria-label="Cerrar ventana"
          onClick={onClose}
        />
        <img
          className="popup__tooltip-image"
          src={isSuccess ? successIcon : errorIcon}
          alt={isSuccess ? "Registro exitoso" : "Error en el registro"}
        />
        <p className="popup__tooltip-message">{message}</p>
      </div>
    </div>
  );
}
