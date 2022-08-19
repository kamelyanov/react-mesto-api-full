class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Authorization": getToken(),
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Authorization": getToken(),
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        "Authorization": getToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._checkResponse)
  }

  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        "Authorization": getToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._checkResponse)
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Authorization": getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": getToken(),
        'Content-Type': 'application/json'
      },
    })
      .then(this._checkResponse)
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes/`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: {
        "Authorization": getToken(),
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }
}

const getToken = () => {
  return `Bearer ${localStorage.getItem('jwt')}`;
}

const api = new Api({
  baseUrl: 'https://backend.mesto.nomoredomains.sbs',
})

export { api } 
