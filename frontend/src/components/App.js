import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import Header from './Header';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from './InfoTooltip';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import * as auth from '../utils/auth'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import success from '../images/success.svg'
import unSuccess from '../images/unSuccess.svg'

function App() {
  const history = useHistory()

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectCard, setSelectCard] = useState(null)
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({})
  const [email, setEmail] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
  const [message, setMessage] = useState({ img: '', text: '' })

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCards(cards)
          setCurrentUser(user)
        })
        .catch((err) => console.log(err));
      tokenCheck()
    }
  }, [loggedIn])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectCard(null)
    setIsInfoTooltipOpen(false)
    setMessage({ img: '', text: '' })
  }

  function onCardClick(card) {
    setSelectCard(card)
  }

  function handleUpdateUser(userData) {
    api.setUserInfo(userData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(userAvatar) {
    api.setUserAvatar(userAvatar)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(id => id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch((err) => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((item) => item !== card))
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(dataNewCard) {
    api.addCard(dataNewCard)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    tokenCheck()
  }, [])

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt')

    if (jwt) {
      auth.getCheckToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true)
            setEmail(res.email)
            history.push('/')
          }
        })
        .catch((err) => console.log(err))
    }
  }

  function handleRegistration(password, email) {
    auth.register(password, email)
      .then((res) => {
        if (res.statusCode !== 201)
          setEmail(res.email)
        history.push('/sign-in')
      })
      .then(() => setMessage({ img: success, text: 'Вы успешно зарегистрировались!' }))
      .catch(() => setMessage({ img: unSuccess, text: 'Что-то пошло не так! Попробуйте ещё раз.' }))
      .finally(() => setIsInfoTooltipOpen(true))
  }

  function handleAuth(password, email) {
    auth.authorize(password, email)
      .then((token) => {
        auth.getCheckToken(token)
          .then((res) => {
            setLoggedIn(true)
            setEmail(res.email)
            history.push('/')
          })
      })
      .catch(() => {
        setMessage({ img: unSuccess, text: 'Что-то пошло не так! Попробуйте ещё раз.' })
        setIsInfoTooltipOpen(true)
      })
  }

  function onSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={email}
          loggedIn={loggedIn}
          onSignOut={onSignOut}
        />

        <Switch>
          <Route path="/sign-up">
            <Register
              onRegister={handleRegistration}
              isOpen={isEditProfilePopupOpen}
              isInfoTooltipOpen={isInfoTooltipOpen}
            />
          </Route>

          <Route path="/sign-in">
            <Login
              onAuth={handleAuth}
              isOpen={isEditProfilePopupOpen}
            />
          </Route>

          <ProtectedRoute
            loggedIn={loggedIn}
            exact path="/"
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            cards={cards}
            onCardClick={onCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </Switch>

        <Footer />

        <InfoTooltip
          name='infoToolTip'
          isOpen={isInfoTooltipOpen}
          img={message.img}
          title={message.text}
          onClose={closeAllPopups}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name='confirm'
          title='Вы уверены?'
        />

        <ImagePopup
          card={selectCard}
          onClose={closeAllPopups}
        />

      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
