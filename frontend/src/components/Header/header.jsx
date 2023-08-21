
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header({ loggedIn, email, onLogout }) {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const handleAuthClick = () => {
    setIsSigningUp(!isSigningUp);
  };
  return (
   
    <header className="header">
      <div className="header__container">
        <div className="header__logo" />
        <div className="header__info-user">
          {loggedIn && <div className="header__email">{email}</div>}
          {loggedIn ? (
            <Link className="header__auth" onClick={onLogout} to="/sign-in">Выйти</Link>
          ) : (
            <>
              {isSigningUp ? (
                <Link className="header__auth" to="/sign-in" onClick={handleAuthClick}> Войти</Link>
              ) : (
                <Link className="header__auth" to="/sign-up" onClick={handleAuthClick}>Регистрация</Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
