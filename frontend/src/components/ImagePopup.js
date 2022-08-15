function ImagePopup(props) {
  const classNamePopup = `image-popup-view popup ${props.card ? 'popup_opened' : ''}`

  return (
    <article className={classNamePopup}>
      <div className="image-popup">
        <img src={props.card?.link}
          alt={props.card ?.name }
          className="image-popup__photo" 
        />
        <p className="image-popup__title">
          {props.card ? props.card.name : ''}
        </p>
        <button className="popup__button-glose image-popup__button-glose" type="button" onClick={props.onClose}></button>
      </div>
    </article>
  )
}

export default ImagePopup