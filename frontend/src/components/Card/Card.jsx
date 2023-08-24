import { useContext } from "react";
import CurrentUserContext from "../../contexts/contexts";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isTrash = card.owner === currentUser._id;
  const isLiked = card.likes.find((like) => like._id === currentUser._id);

    return (
        <article className="element__item"
         key={card._id}>
            <img className="element__photo"
            src={card.link}
                onClick={()=>onCardClick(card)} 
                alt={card.name} />
            <div className="element__text">
                <h2 className="element__caption">{card.name}</h2>
                <div className="element__likes-block">
                    <button type="button" name="like"  
                   className={`element__like ${isLiked && "element__like_active"}`}
                    onClick={()=>onCardLike(card)} />
                    <span className="element__like_counter">
                        {card.likes.length}
                    </span>
                </div>
            <button type="button" name="trash"
                    className={`button-pointer ${isTrash ? 'element__garbage' : 'element__garbage_visible'}`}
                    onClick={()=>onCardDelete(card._id)}
                />
            </div>
        </article>
    )
}

