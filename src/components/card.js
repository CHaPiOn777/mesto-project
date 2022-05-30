// функция создания карточки
import {
  PopupWithImage
} from './utils.js';
import {
  Api
} from './api.js';

export const popupImg = document.querySelector('.card-img'); /*блок формы редктирования картинки*/
export const cardTemplate = document.querySelector('#card-template').content;

export const formCard = document.forms.popupCard; /*форма карточки*/
export const inputCardName = formCard.elements.name;
export const inputCardSubtitle = formCard.elements.subtitle;

export const cards = document.querySelector('.cards'); /*карточки*/
export const popupCard = document.querySelector('.popup__card'); /*блок формы редктирования профиля*/
//создаем класс для создания карточки


export class Card {
  constructor(data, userId, popupImg) {
    this._data = data,
    this._userId = userId,
    this._cards = document.querySelector('.cards'),
    this._cardTemplate = document.querySelector('#card-template').content,
    this._popupImg = popupImg
  }

  //загрузка карточек
  downloadCards() {
    for (let i = 0; i < this._data.length; i++) {

      //создаем экземпляр класса карточек и создание разметок для всех карточек
      const card = new Card (this._data[i], this._userId, popupImg);
      const cardNew = card.generate();

      //вставить полученную разметку карточек
      this._cards.append(cardNew);
    }
  }

  //создание разметки карточки
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
      if (!this._element.querySelector('.card__like').classList.contains('card__like_active')) {
        new Api(`cards/likes/${this._data._id}`, 'PUT').fetch()
          .then(res => {
            this._cardLike.classList.toggle('card__like_active');
            this._like.textContent = res.likes.length;
          })
          .catch(err => console.error(`Ошибка: ${err.status}`))
      } else {
        new Api(`cards/likes/${this._data._id}`, 'DELETE').fetch()
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
        this._element.querySelector('.card__like').classList.add('card__like_active')
      }
    })
  }

  //обработчики
  _setEventListener() {

    //обработчик лайка
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._putLike();
    })

    //обработчик открытия изображения
    this._cardImg.addEventListener('click', () => {
      new PopupWithImage(this._popupImg, this._data.link, this._data.name ).openPopup();
  })

  //удаляет карточку при нажатии на иконку
    this._remove.addEventListener('click', () => {
      new Api(`cards/${this._data._id}`, 'DELETE').fetch()
        .then(() => {
          this._element.remove();
        })
        .catch(err => console.error(`Ошибка: ${err.status}`))
    })
  }
}

export let getCards =  new Promise((resolve, reject) => {
  new Api('cards', 'GET').fetch()
  .then((result) => {
    resolve(result)
  })
  .catch(err => reject(console.error(`Ошибка: ${err.status}`)))
})

