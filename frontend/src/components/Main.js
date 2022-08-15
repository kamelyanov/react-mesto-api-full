import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} onClick={props.onEditAvatar}></div>
          <div className="profile__info-name">
            <h1 className="profile__name-title">{currentUser.name}</h1>
            <p className="profile__info-description">{currentUser.about}</p>
          </div>
          <button className="profile__name-edit" type="button" onClick={props.onEditProfile}></button>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="cards">
        {
          props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />)
          )
        }
      </section>
    </main>
  )
}

export default Main