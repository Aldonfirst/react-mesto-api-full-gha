import { useEffect, useContext } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import CurrentUserContext from "../../contexts/contexts";
import useFormWithValidation from "../../hooks/useFormWithValidation";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    resetForm({
      username: currentUser.name || "",
      job: currentUser.about || "",
    });
  }, [isOpen, currentUser, resetForm]);
  
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      username: values.username,
      job: values.job,
    });
  }
  return (
    <PopupWithForm
      name="popup-profile"
      title="Редактировать профиль"
      buttonName="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >  
      <input
        className={`popup__imput-edit ${errors.username && "popup__imput-edit_vizible"}`}
        id="username-imput"
        type="text"
        name="username"
        placeholder="Введите имя"
        minLength="2"
        maxLength="40"
        value={values.username || ""}
        onChange={handleChange}
        required
      />
      <span className="popup__error username-imput-error">{errors.username}</span>
      <input
     className={`popup__imput-edit ${errors.job && "popup__imput-edit_vizible"}`}
        id="userjob-imput"
        type="text"
        name="job"
        placeholder="Введите род деятельности"
        minLength="2"
        maxLength="200"
        value={values.job || ""}
        onChange={handleChange}
        required
      />
      <span className="popup__error userjob-imput-error">{errors.job}</span>
    </PopupWithForm>
  );
}