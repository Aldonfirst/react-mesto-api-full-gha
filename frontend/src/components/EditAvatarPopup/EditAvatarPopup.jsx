import { useRef,useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useFormWithValidation from "../../hooks/useFormWithValidation";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);
  
  return (
    <PopupWithForm
      name="popup-avatar"
      title="Обновить аватар"
      buttonName="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        type="url"
        name="avatar"
        className={`popup__imput-edit ${errors.avatar && "popup__imput-edit_vizible"}`}
        placeholder="Ссылка на картинку"
        required=""
        value={values.avatar || ""}
        onChange={handleChange}
        ref={avatarRef}
      />
      <span className="popup__error  upl-avatar-error">{errors.avatar || ""}</span>
    </PopupWithForm>
  );
}