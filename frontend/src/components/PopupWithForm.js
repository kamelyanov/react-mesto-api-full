function PopupWithForm(props) {
  const classNamePopup = `popup ${props.name}-popup ${props.isOpen ? 'popup_opened' : ''}`

  return (
    <article className={classNamePopup}>
      <div className={`${props.name} popup__container`}>
        <h2 className="popup__title">{props.title}</h2>
        <form className={`form ${props.name}__form`} onSubmit={props.onSubmit}>
          <fieldset className="form__set">
            {props.children}
            <label className="form__field">
              <button className="popup__btn-save" type="submit">Сохранить</button>
            </label>
          </fieldset>
        </form>
        <button className="popup__button-glose edit-form__button-glose" type="button" onClick={props.onClose}></button>
      </div>
    </article>
  )
}

export default PopupWithForm