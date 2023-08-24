class Api {
  constructor(options) {
    this._baseUrl = options.url;
    this._headers = options.headers;

  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  //метод профиля
  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: "include",
    })
      .then(this._checkResponse);
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.username,
        about: data.job,
      }),
      credentials: "include",
    })
      .then(this._checkResponse);
  }
  //метод карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      credentials: "include",
    })
      .then(this._checkResponse);
  }

  addCard(data) {
 
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.link
      }),
      credentials: "include",
    })
      .then(this._checkResponse);
  }

  deleteMyCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: "include", 
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      }),
      credentials: "include" ,
    })
      .then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    let method = 'DELETE';
    if (isLiked) {
      method = 'PUT';
    }
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: method,
      headers: this._headers,
      credentials: "include" ,
    })
      .then(this._checkResponse);
  }


}

const api = new Api({

  // url: 'http://localhost:3000',
  url: 'https://api.aldon.nomoredomainsicu.ru',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api