//* Клfасс для взаимодействия с сервером
export default class Api {
  constructor(data) {
    this._baseUrl = data.serverUrl;
    this._token = data.token;
    this._headers = {
      'Content-Type': 'application/json; charset=UTF-8',
      authorization: this._token,
    };
  }
  
  //* Проверка статуса запроса
  _requestResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(
        `Что-то пошло не так: Ошибка ${res.status} - ${res.statusText}`
      );
    }
  }

  //* Запрос данных пользователя
  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  }
  //* - Запрос изначальных карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  }

  editAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.subtitle,
      }),
    }).then((res) => this._requestResult(res));
  }

  //* Запрос на редактирование данных пользователя
  editProfile(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.subtitle,
      }),
    }).then((res) => this._requestResult(res));
  }

  //* Запрос на добавление карточки
  addNewCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.subtitle,
      }),
    }).then((res) => this._requestResult(res));
  }

  //* Запрос на удаление карточки
  deleteCard(data) {
    return fetch(`${this._baseUrl}cards/${data}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  }

  //* Запрос на добавление лайка карточке
  addCardLike(data) {
    return fetch(`${this._baseUrl}cards/likes/${data}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  }

  //* Запрос на удаление лайка карточки
  deleteCardLike(data) {
    return fetch(`${this._baseUrl}cards/likes/${data}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  }
}