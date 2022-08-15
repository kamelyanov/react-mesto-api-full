import React from "react"
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = ''
  }

  return (
    <PopupWithForm
      name='update-avatar'
      title='Обновить аватар'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          type="url"
          name="avatar"
          placeholder="Ссылка на новый аватар"
          className="popup__input popup__input-type-linkNewAvatar"
          id="avatar"
          required
          ref={avatarRef}
        />
        <span className="popup__input-error" id="avatar-error"> </span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup