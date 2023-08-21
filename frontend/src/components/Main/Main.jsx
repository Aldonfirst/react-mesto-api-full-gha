import { useContext } from "react";
import Card from "../Card/Card";
import CurrentUserContext from "../../contexts/contexts";

export default function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {
 
    const currentUser = useContext(CurrentUserContext);
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__content">
                    <button className="profile__avatar-button"
                        type="button"
                        onClick={onEditAvatar}>
                        <img className="profile__avatar"
                            src={currentUser.avatar}
                            alt="Фото профиля" />
                    </button>
                    <div className="profile__info">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button type="button"
                            className="button-pointer profile__userbutton"
                            onClick={onEditProfile}
                        />
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button type="button" className="button-pointer profile__saveimage" onClick={onAddPlace} />
            </section>
            <section className="element" >
                {cards.map(card => {
                    return <Card
                        key={card._id}
                        card={card}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />
                })}
                
            </section>
        </main>
    )
}
