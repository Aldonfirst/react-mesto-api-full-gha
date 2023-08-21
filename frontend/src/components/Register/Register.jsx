import React from 'react';
import useFormWithValidation from "../../hooks/useFormWithValidation";
import {Link} from 'react-router-dom';

export default function Register({handleRegister}) {
  const { values, handleChange,errors,resetForm} = useFormWithValidation();

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form
        className="auth__form"
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister({
            email: values.email,
            password: values.password});
            resetForm();
        }}
      >
        <input
         className={`popup__imput-edit ${errors.email && "popup__imput-edit_vizible"}`}
          name="email"
          type="email"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
          minLength="3"
          maxLength="40"
          required
        />
          <span className="popup__error">{errors.email}</span>
        <input
        className={`popup__imput-edit ${errors.password && "popup__imput-edit_vizible"}`}
          name="password"
          type="password"
          placeholder="Пароль"
          value={values.password || ""}
          onChange={handleChange}
          minLength="3"
          maxLength="200"
          required
        />
              <span className="popup__error">{errors.password}</span>
        <button className="auth__submit" type="submit">Зарегистрироваться</button>
      </form>
      <p className="auth__register-text">Уже зарегистрированы? <Link to='/sign-in' className="auth__sign-in">Войти</Link></p>
    </div>
  );
};

