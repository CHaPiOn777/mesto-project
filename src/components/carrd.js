import {
  Api
} from './Api.js';
import {api} from './index.js';
export class Card {
  constructor(data, userId, popupImg, cardTemplate, handleCardClick) {
    this._data = data,
    this._userId = userId,
    this._cardTemplate = cardTemplate,
    this._popupImg = popupImg,
    this._handleCardClick = handleCardClick
  }


  // -создание разметки карточки
  generate() {
    this._element = this._getElement();
    this._cardImg = this._element.querySelector('.card__img');
    this._remove = this._element.querySelector('.card__delete');
    this._like = this._element.querySelector('.card__like-number');
    this._cardLike = this._element.querySelector('.card__like');
    this._remove = this._element.querySelector('.card__delete');

    this._like.textContent = `${this._data.likes.length}`;
    this._cardImg.setAttribute('alt', `${this._data.name}`);
    this._cardImg.setAttribute('src', `${this._data.link}`)
    this._cardImg.setAttribute('aria-label', `${this._data.name}`);
    this._element.querySelector('.card__title').textContent =`${this._data.name}`;
    this._checkMyLike();
    this._checkMyCard();
    this._setEventListener();

    return this._element
  }

  //получение разметки карточки
  _getElement() {
    const cardElement = this
    ._cardTemplate
    .querySelector('.card')
    .cloneNode(true);
    return cardElement
  }

  //ставит иконку карзину моим карточкам
  _checkMyCard() {
    if (this._data.owner._id != this._userId) {
      this._remove.style.display = 'none';
    } else {
      this._remove.style.display = 'block';
    }
  }

  //поставить лайк
  _putLike() {
      if (!this._cardLike.classList.contains('card__like_active')) {
        api.addCardLike(`${this._data._id}`)
          .then(res => {
            this._cardLike.classList.toggle('card__like_active');
            this._like.textContent = res.likes.length;
          })
          .catch(err => console.error(`Ошибка: ${err.status}`))
      } else {
        api.deleteCardLike(`${this._data._id}`)
          .then(res => {
            this._cardLike.classList.toggle('card__like_active');
            this._like.textContent = res.likes.length;
          }) 
          .catch(err => console.error(`Ошибка: ${err.status}`))
      }
      
    }

  //проверить ставил ли я лайки
  _checkMyLike() {
    this._data.likes.forEach(item => {
      if (item._id == this._userId) {
        this._cardLike.classList.add('card__like_active')
      }
    })
  }

  //обработчики
  _setEventListener() {

    //обработчик лайка
    this._cardLike.addEventListener('click', () => {
      this._putLike();
    })

    //обработчик открытия изображения
    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._data.name , this._data.link);
  })

  //удаляет карточку при нажатии на иконку
    this._remove.addEventListener('click', () => {
      api.deleteCard(`${this._data._id}`)
        .then(() => {
          this._element.remove();
        })
        .catch(err => console.error(`Ошибка: ${err.status}`))
    })
  }
}



