import PopupWithForm from "../PopupWithForm/PopupWithForm";
import success from "../../images/GoodForm.png";
import error from "../../images/errorForm.png";

export default function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
<>
      <PopupWithForm
        name='infoTooltip'
        isOpen={isOpen}
        onClose={onClose}
      >
        <img  className="infoTooltip-icon" src={isSuccess ? success : error} alt={isSuccess ?
           'Вы успешно зарегистрировались' : 'Ошибка в регистрации пользователя'}/>
      </PopupWithForm>
      </>
  );
}

