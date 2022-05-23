export default class Api {
  constructor(data) {
    this._baseUrl = data.serverUrl;
    this._token = data.token;
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
  getUserInfo(){
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
    })
    .then((result) => {
      resolve(result)
    })
    .catch(err => console.error(`Ошибка: ${err.status}`))
    
  }
  //* Запрос avatar
  editAvatar(){
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        authorization: this._token,
      },
      body: JSON.stringify({
        avatar: inputProfileIcon.value
      })
    })
    .then(res => {
      profileIcon.style.backgroundImage = `url(${inputProfileIcon.value})`;
      const popup = new Popup(popupProfileIcon);
      popup.closePopup();
    })
    .catch(err => console.error(`Ошибка: ${err.status}`))
    .finally(res => {
      renderLoading(false, btnProfileIcon);
    
    })
  }

  //* Запрос изначальных карточек

  getInitialCards(){
    return fetch(`${this._baseUrl}cards`, {
      method: 'GET',
    })
    .then((result) => {
      resolve(result)
    })
    .catch(err => console.error(`Ошибка: ${err.status}`))
  }
  
  //* Запрос на редактирование данных пользователя
  editProfile(){
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        authorization: this._token,
      },
      body: JSON.stringify({
        name: inputProfileName.value,
        about: inputProfileSubtitle.value})
    })
    .then(res => handleProfileFormSubmit())
    .catch(err => console.error(`Ошибка: ${err.status}`))
    .finally(res => renderLoading(false, btnProfile));
  }

  //* Запрос на добавление карточки
  addNewCard(){
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        authorization: this._token,
      },
      body: JSON.stringify({
        link: inputCardSubtitle.value,
        name: inputCardName.value
      })
    })
    .then(res => {
      cards.prepend(createNewCard(res.name, res.link, res.owner._id, res._id, res.likes.length, res.likes));
      new Popup(popupCard).closePopup();
      formCard.reset();
    })
    .catch(err => console.error(`Ошибка: ${err.status}`))
    .finally(res => {
      renderLoading(false, btnCard);
    });
  }

  //* Запрос на удаление карточки
  deleteCard(){
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: 'DELETE',
    })
    .then(() => {
      cardElement.remove();
    })
    .catch(err => console.error(`Ошибка: ${err.status}`))
  }
  //* Запрос на добавление лайка карточке
  addCardLike(){
    return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
      method: 'PUT',
    })
    .then(res => {
      evt.target.classList.toggle('card__like_active');
      like.textContent = res.likes.length;
    })
    .catch(err => console.error(`Ошибка: ${err.status}`))
  }
  //* Запрос на удаление лайка карточки
  deleteCardLike(){
    return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
      method: 'DELETE',
    })
    .then(res => {
      evt.target.classList.toggle('card__like_active');
      like.textContent = res.likes.length;
    })
    .catch(err => console.error(`Ошибка: ${err.status}`))
  }
}