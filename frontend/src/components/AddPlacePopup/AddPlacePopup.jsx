import useFormWithValidation from "../../hooks/useFormWithValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useEffect } from "react";
export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace({
      title: values.title,
      link: values.link
    })
  };
  //ресет
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);
  return (
    <PopupWithForm
      name="popup-galery"
      title="Новое место"
      buttonName="Создать"
      isOpen={isOpen}
      onClose={() => {
        resetForm();
        onClose();
      }}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        className={`popup__imput-edit ${errors.title && "popup__imput-edit_vizible"}`}
        id="img-name-input"
        type="text"
        name="title"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        required
        value={values.title || ""}
        onChange={handleChange}
      />
      <span className="popup__error img-name-input-error">
        {errors.title}
      </span>
      <input
        className={`popup__imput-edit ${errors.link && "popup__imput-edit_vizible"}`}
        id="upl-name-input"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={values.link || ""}
        onChange={handleChange}
      />
      <span className="popup__error upl-name-input-error">
        {errors.link}
      </span>
    </PopupWithForm>
  );
}
