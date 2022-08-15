function InfoTooltip ({name, isOpen, img, title, onClose}) {
    const classNamePopup = `popup ${name} ${isOpen && 'popup_opened'}`
  
  return (
    <div className={classNamePopup}>
      <div className="infoToolTip__info">
        <img src={img} alt={title} className="infoToolTip__image"/>
        <h2 className="infoToolTip__title">{title}</h2>
        <button className="popup__button-glose edit-form__button-glose" type="button" onClick={onClose}></button>
      </div>
    </div>  
  )
}

export default InfoTooltip