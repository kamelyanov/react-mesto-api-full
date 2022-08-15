import React from "react"
import PopupWithForm from "./PopupWithForm"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

function EditProfilePopup(props) {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name='edit-form'
      title='Редактировать профиль'
      onEditProfile=''
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input type="text" name="name" placeholder="Имя" className="popup__input edit-form__input_type_name"
          minLength="2" maxLength="40" id="name-input" required
          value={name || ''}
          onChange={handleNameChange}
        />
        <span className="popup__input-error" id="name-input-error"> </span>
      </label>
      <label className="form__field">
        <input type="text" name="about" placeholder="Профессия"
          className="popup__input edit-form__input_type_description" minLength="2" maxLength="200"
          id="description-input" required
          value={description || ''}
          onChange={handleDescriptionChange}
        />
        <span className="popup__input-error" id="description-input-error"> </span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup
