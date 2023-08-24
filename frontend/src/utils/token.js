const baseUrl ='http://localhost:3000'
// // const baseUrl ='https://auth.nomoreparties.co'
// const baseUrl ='https://api.aldon.nomoredomainsicu.ru'
const _checkResponse = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка ${res.status}`);
}

const register = (email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include',
    body: JSON.stringify({email, password})
  })
    .then((res) => _checkResponse(res))
};

const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
    .then((res) => _checkResponse(res))
    .then((data) => {
      if (data.token){
        localStorage.setItem('jwt', data.token);
        return data;
      }
    });
};

const logout = () => {
  return fetch(`${baseUrl}/signout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
  })
    .then((res) => _checkResponse(res))
};

const getToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  })
    .then((res) => _checkResponse(res))
};

export const auth = {
  register,
  authorize,
  getToken,
  logout,
};

// class AuthUser {
//   constructor({ baseUrl }) {
//     this._baseUrl = baseUrl;
//   }

//   _checkResponse(res) {
//     if (res.ok) return res.json();
//     return Promise.reject(`Ошибка ${res.status}`);
//   }

//   register = (email, password) => {
//     return fetch(`${this._baseUrl}/signup`, {
//       method: 'POST',
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({email, password})
//     })
//       .then((res) => this._checkResponse(res))
//   };

//   authorize = (email, password) => {
//     return fetch(`${this._baseUrl}/signin`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     }).then((res) => this._checkResponse(res))
//       .then((data) => {
//         if (data.token){
//           localStorage.setItem('jwt', data.token);
//           return data;
//         }
//       });
//   };

//   getToken = (token) => {
//     return fetch(`${this._baseUrl}/users/me`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }).then((res) => this._checkResponse(res))
//   };
// }
// export const auth = new AuthUser({
//   baseUrl: 'https://auth.nomoreparties.co',
// });