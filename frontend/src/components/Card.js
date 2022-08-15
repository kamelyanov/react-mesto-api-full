import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__delete ${isOwn ? ' ' : 'card__delete_hidden'}`
  );

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `card__like ${isLiked ? 'card__like_active' : ' '}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleCardDelete() {
    props.onCardDelete(props.card)
  }

  return (
    <article className="card">
      <img src={props.card.link} alt={props.card.name} className="card__photo" onClick={handleClick} />
      <div className="card__info">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__likes">
          <button type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="card__likeCounter">{props.card.likes.length}</span>
        </div>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleCardDelete}
      ></button>
    </article>
  )
}

export default Card;