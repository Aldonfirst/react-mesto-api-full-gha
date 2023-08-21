import React from "react";
import { useEffect } from "react";
export default function PopupWithForm({ name, title, buttonName, children, isOpen, onClose, onSubmit, isValid }) {
  //эскейп
  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }
    function handleOverlayClose(evt) {
      if (evt.target.classList.contains('popup')) {
        onClose();
      }
    }
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('mousedown', handleOverlayClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('mousedown', handleOverlayClose);
    };
  }, [onClose]);

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button type="button"
          className="button-pointer popup__close"
          onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form"
          name={name}
          onSubmit={onSubmit}
          noValidate >
          {children}
          <button className={`popup__button-validate
           ${!isValid && "popup__button-validate_disabled"}`} type="submit" disabled={!isValid}>
            {buttonName}
          </button>
        </form>
      </div>
    </div>
  )
}

