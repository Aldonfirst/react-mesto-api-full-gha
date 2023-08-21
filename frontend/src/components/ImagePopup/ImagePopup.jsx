import React from "react";
export default function ImagePopup({ card, onClose }){
    return (
        <div className={`popup popup__image ${card ? "popup_opened" : ""}`}>
        <div className="popup__image">
          <div className="popup-figure">
            <button 
            className="button-pointer popup__close" 
            onClick={onClose}/>
            <img src={card ? card.link : ""}
                 alt={card ? card.name : ""}
            className="popup-figure__image" />
            <p className="popup-figure__figcaption">{card ? card.name : ""}</p>
          </div>
        </div>
      </div>   
    )
}


