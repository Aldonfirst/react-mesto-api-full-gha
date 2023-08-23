import Header from "./Header/header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer"
import ImagePopup from "./ImagePopup/ImagePopup";
import { useState, useEffect } from "react";

import EditProfilePopup from "../components/EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../components/EditAvatarPopup/EditAvatarPopup";
import EditDeletePopup from "./EditDeletePopup/EditDeletePopup";
import AddPlacePopup from "../components/AddPlacePopup/AddPlacePopup";
import api from '../utils/api';
import CurrentUserContext from "../contexts/contexts";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import { auth } from "../utils/token";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Login from "./Login/Login";
import Register from "./Register/Register";
//App
export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditDeletePopupOpen, setIsEditDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isDeleteCard, setIsDeleteCard] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccessAuth, setIsSuccessAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenCheck = () => {
      const token = localStorage.getItem('jwt');
      if (token) {
        auth.getToken(token)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              navigate("/");
              setUserEmail(res.email);
            }
          })
          .catch((err) => console.error(err));
      };
    }
    tokenCheck();
  }, [navigate]);

  useEffect(() => {
    loggedIn && Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
        cardsData.map(item => item.myId = userData._id)
      })
      .catch((err) => console.error(err));
  }, [loggedIn]);

  function handleLogout() {
    localStorage.removeItem('jwt');
    auth.logout()
    setUserEmail('');
    setLoggedIn(false);

  }
  //закрывашка
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsImagePopupOpen(false);
    setIsEditDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }
  //--------------------------------------------------------
  //профиль
  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //аватарка
  function handleUpdateAvatar(avatar) {
    api.editAvatar(avatar)
      .then((userAvatar) => {
        setCurrentUser(userAvatar);
        closeAllPopups();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //новая карточка
  function handleAddPlaceSubmit(newCard) {
    api.addCard(newCard)
      .then((newCard) => { 
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }
  //лайки
  function handleCardLike(card) {
    const isLiked = card.likes.find((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) =>
            (c._id === card._id ? newCard : c)));

      })
      .catch((error) => {
        console.error(error);
      });

  }
  function handleCardDelete(cardId) {
    setIsDeleteCard(cardId);
    setIsEditDeletePopupOpen(true);
  }
  //для попапа Удаления
  function handleDeleteSubmit(evt) {
    evt.preventDefault()
    api
      .deleteMyCard(isDeleteCard)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== isDeleteCard));
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }


  //регистрация
  function handleRegister(values) {
    const { email, password } = values;
    auth.register(email, password)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setIsSuccessAuth(true)
        navigate('/sign-in');
      }).catch((err) => {
        console.error(err)
        setIsInfoTooltipOpen(true);
        setIsSuccessAuth(false)
      });
  }
  //логин
  function handleLogin({ email, password }) {
    auth.authorize(email, password)
      .then(() => {
        setUserEmail(email);
        setLoggedIn(true);
        navigate('/');
      }).catch(err => {
        console.error(err)
        setIsInfoTooltipOpen(true);
        setIsSuccessAuth(false)
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page-content">
        <Header email={userEmail} loggedIn={loggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<ProtectedRoute
            element={Main}
            loggedIn={loggedIn}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onEditProfile={() => setIsEditProfilePopupOpen(true)}
            onAddPlace={() => setIsAddPlacePopupOpen(true)}
            onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
            onCardClick={handleCardClick}
          />
          } />
          <Route path="/sign-up" element={<Register handleRegister={handleRegister} />} />
          <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
        <EditDeletePopup isOpen={isEditDeletePopupOpen} onClose={closeAllPopups} onSubmit={handleDeleteSubmit} />
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isSuccess={isSuccessAuth} />
      </div>
    </CurrentUserContext.Provider>
  );
}