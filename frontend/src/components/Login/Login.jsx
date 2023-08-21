
import useFormWithValidation from "../../hooks/useFormWithValidation";

export default function Login({ handleLogin }) {
  const { values, handleChange, errors, resetForm } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin({
      email: values.email,
      password: values.password
    });
    resetForm()
  }
  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form
        className="auth__form"
        onSubmit={handleSubmit}
      >
        <input
          className={`popup__imput-edit ${errors.email && "popup__imput-edit_vizible"}`}
          name="email"
          type="email"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
          minLength="2"
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
        <button className="auth__submit" type="submit">Войти</button>
      </form>

    </div>
  )
}

