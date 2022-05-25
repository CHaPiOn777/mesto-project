// функция создания карточки
import {
  Popup,
  renderLoading,
  PopupWithImage
} from './utils.js';
import { 
  userId
} from './index.js';
import {
  addImg
} from './modal.js';
import {
  callServer,
  Api
} from './api.js';

export const popupImg = document.querySelector('.card-img'); /*блок формы редктирования картинки*/
export const cardTemplate = document.querySelector('#card-template').content;

export const formCard = document.forms.popupCard; /*форма карточки*/
export const inputCardName = formCard.elements.name;
export const inputCardSubtitle = formCard.elements.subtitle;
const btnCard = document.querySelector('.btn-card');

export const cards = document.querySelector('.cards'); /*карточки*/
export const popupCard = document.querySelector('.popup__card'); /*блок формы редктирования профиля*/


export function addNewCard() {

  renderLoading(true, btnCard);
  new Api ('cards', 'POST', ({
    link: inputCardSubtitle.value,
    name: inputCardName.value
  })).fetch()
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

// function checkMyCard(id, icon) {
//   if (id != userId) {
//     icon.style.display = 'none';
//   } else {
//     icon.style.display = 'block';
//   }
// }

// function deleteCard(remove, cardId, cardElement) {
//   remove.addEventListener('click', function () {
//     new Api(`cards/${cardId}`, 'DELETE').fetch()
//       .then(() => {
//         cardElement.remove();
//       })
//       .catch(err => console.error(`Ошибка: ${err.status}`))
//   })
// }

// function putLike(cardElement, like, cardId) {
//   cardElement.querySelector('.card__like').addEventListener('click', (evt) => {

//     if (!evt.target.classList.contains('card__like_active')) {
//       new Api(`cards/likes/${cardId}`, 'PUT').fetch()
//         .then(res => {
//           evt.target.classList.toggle('card__like_active');
//           like.textContent = res.likes.length;
//         })
//         .catch(err => console.error(`Ошибка: ${err.status}`))
//     } else {
//       new Api(`cards/likes/${cardId}`, 'DELETE').fetch()
//         .then(res => {
//           evt.target.classList.toggle('card__like_active');
//           like.textContent = res.likes.length;
//         }) 
//         .catch(err => console.error(`Ошибка: ${err.status}`))
//     }
//   })
// }

// function checkMyLike(cardElement, likes) {
//   likes.forEach(item => {
//     if (item._id == userId) {
//       cardElement.querySelector('.card__like').classList.add('card__like_active')
//     }
//   })
// }
/* функция создания карточки */
// export function createNewCard(name, link, myId, cardId, numLike, likeActiveId) {
//   const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
//   const cardImg = cardElement.querySelector('.card__img');
//   const remove = cardElement.querySelector('.card__delete');
//   const like = cardElement.querySelector('.card__like-number');


//   // like.textContent = numLike;
//   cardImg.setAttribute('alt', name);
//   cardImg.setAttribute('src', link)
//   cardImg.setAttribute('aria-label', name);
//   cardElement.querySelector('.card__title').textContent = name;

//   //поставить лайк
//   putLike(cardElement, like, cardId);

//   //проверить моя ли карточка и сделать активной кнопку удаления
//   checkMyCard(myId, remove);
//   // удаляет карточку
//   deleteCard(remove, cardId, cardElement);

//   // При нажатии на картинку в карточке открывает ее полное изображение
//   cardImg.addEventListener('click', function () {
//       new PopupWithImage(popupImg, link, name ).openPopup();
//   })
//   //проверрить мой ли лайк стоит
//   checkMyLike(cardElement, likeActiveId);

//   //заполнить лайк числом
//   // like.textContent = numLike;
//   return cardElement;
// }
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

// export function downloadCards(result) {
//   console.log(result);
//   for (let i = 0; i < result.length; i++) {
//     cards.append(createNewCard(result[i].name, result[i].link, result[i].owner._id, result[i]._id, result[i].likes.length, result[i].likes));
//   }
// }

export let getCards =  new Promise((resolve, reject) => {
  new Api('cards', 'GET').fetch()
  .then((result) => {
    resolve(result)
  })
  .catch(err => reject(console.error(`Ошибка: ${err.status}`)))
})

