export const BASE_URL = 'https://backend.mesto.nomoredomains.sbs'

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return console.log('Ошибка на сервере: ' + res.status + ' - ' + res.statusText);
  })
}

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((response => response.json()))
  .then((data) => {
    if (data.token){
      localStorage.setItem('jwt', data.token);
      return data.token;
    } 
  })
  .catch(err => console.log('Ошибка на сервере: ' + err.status + ' - ' + err.statusText))
};

export const getCheckToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
  .then((response => response.json()))
  .then(res => res)
  .catch(err => console.log('Ошибка на сервере: ' + err.status + ' - ' + err.statusText))
};
