import React from "react"
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup(props) {
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name='add-card'
      title='Новое место'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          type="text"
          name="name"
          placeholder="Название"
          className="popup__input add-card__input-type-namePhoto"
          minLength="2"
          maxLength="30"
          id="namePhoto"
          required
          value={name || ''}
          onChange={handleNameChange}
        />
        <span className="popup__input-error" id="namePhoto-error"> </span>
      </label>
      <label className="form__field">
        <input
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          className="popup__input add-card__input-type-linkPhoto"
          id="linkPhoto"
          required
          value={link || ''}
          onChange={handleLinkChange}
        />
        <span className="popup__input-error" id="linkPhoto-error"> </span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup