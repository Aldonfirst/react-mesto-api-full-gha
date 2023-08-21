import PopupWithForm from "../PopupWithForm/PopupWithForm";
export default function EditDeletePopup({isOpen, onClose,onSubmit,isValid}) {

return(
    <PopupWithForm                                           
name="popup-type-delete"
title="Вы уверены?"
buttonName="Да"
isOpen={isOpen}
onClose={onClose}
onSubmit={onSubmit}
isValid={!isValid}
/>
)
}
