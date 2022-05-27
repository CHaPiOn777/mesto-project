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

// class Card {
//   constructor({
//     data,
//     cardTemplate,
//     userId,
//     imagePopup,
//     deleteCard,
//     addCardLike,
//     deleteCardLike
//   }, selector) {
//     this._data = data,
//     this._cardTemplate = cardTemplate,
//     this._userId = userId,
//     this._cardId = data._id,
//     this._imagePopup = imagePopup,
//     this._deleteCard = deleteCard,
//     this._addCardLike = addCardLike,
//     this._deleteCardLike = deleteCardLike,
//     this._selector = selector
//     this._likeButton = this._element.querySelector(".card__like");
//     this._deleteButton = this._element.querySelector(".card__delete");
//     this._likeCounter = this._element.querySelector(".card__like-number");
//   }
//   _getTemplate() {
//     const cardElement = document
//       .querySelector(this._cardTemplate)
//       .content.querySelector(".card")
//       .cloneNode(true);
//     return cardElement;
//   }
//   createCardElement(){
//     this._setEventListeners();
//     const cardImage = this._element.querySelector(".card-img");
//     cardImage.alt = `${this._data.name}`;
//     cardImage.src = this._data.link;
//     this._element.querySelector(
//       ".card__title"
//     ).textContent = this._data.name;
//     this._element.querySelector(
//       ".card__like-number"
//     ).textContent = this._data.likes.length;
//     this._setIsLiked();
//     return this._element;
//   }
//   _likeToggler() {
//     this.cardElement.querySelector(this._likeButton).addEventListener('click', (evt) => {
//       if (!evt.target.classList.contains('card__like_active')) {
//         new Api(`cards/likes/${this.cardId}`, 'PUT').fetch()
//           .then(res => {
//             evt.target.classList.toggle('card__like_active');
//             this._likeButton.textContent = res.likes.length;
//           })
//           .catch(err => console.error(`Ошибка: ${err.status}`))
//       } else {
//         new Api(`cards/likes/${this.cardId}`, 'DELETE').fetch()
//           .then(res => {
//             evt.target.classList.toggle('card__like_active');
//             this._likeButton.textContent = res.likes.length;
//           }) 
//           .catch(err => console.error(`Ошибка: ${err.status}`))
//       }
//     })
//   }
//   _setEventListeners() {
//     this.cardElement.querySelector('.card__like').addEventListener('click', (evt) => {
//       if (!evt.target.classList.contains('card__like_active')) {
//         new Api(`cards/likes/${this.cardId}`, 'PUT').fetch()
//           .then(res => {
//             evt.target.classList.toggle('card__like_active');
//             this._likeButton.textContent = res.likes.length;
//           })
//           .catch(err => console.error(`Ошибка: ${err.status}`))
//       } else {
//         new Api(`cards/likes/${this.cardId}`, 'DELETE').fetch()
//           .then(res => {
//             evt.target.classList.toggle('card__like_active');
//             this._likeButton.textContent = res.likes.length;
//           }) 
//           .catch(err => console.error(`Ошибка: ${err.status}`))
//       }
//     })
//   }
//   _setIsLiked() {
//     this.addCardLike.forEach(item => {
//       if (item._id == this.userId) {
//         this.cardElement.querySelector('.card__like').classList.add('card__like_active')
//       }
//     })
//   }
//   deleteCard() {
//     this._deleteButton.addEventListener('click', function () {
//       new Api(`cards/${this.cardId}`, 'DELETE').fetch()
//         .then(() => {
//           this.cardElement.remove();
//         })
//         .catch(err => console.error(`Ошибка: ${err.status}`))
//     })
//   }
// }


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

function checkMyCard(id, icon) {
  if (id != userId) {
    icon.style.display = 'none';
  } else {
    icon.style.display = 'block';
  }
}

function deleteCard(remove, cardId, cardElement) {
  remove.addEventListener('click', function () {
    new Api(`cards/${cardId}`, 'DELETE').fetch()
      .then(() => {
        cardElement.remove();
      })
      .catch(err => console.error(`Ошибка: ${err.status}`))
  })
}

function putLike(cardElement, like, cardId) {
  cardElement.querySelector('.card__like').addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('card__like_active')) {
      new Api(`cards/likes/${cardId}`, 'PUT').fetch()
        .then(res => {
          evt.target.classList.toggle('card__like_active');
          like.textContent = res.likes.length;
        })
        .catch(err => console.error(`Ошибка: ${err.status}`))
    } else {
      new Api(`cards/likes/${cardId}`, 'DELETE').fetch()
        .then(res => {
          evt.target.classList.toggle('card__like_active');
          like.textContent = res.likes.length;
        }) 
        .catch(err => console.error(`Ошибка: ${err.status}`))
    }
  })
  
}

function checkMyLike(cardElement, likes) {
  likes.forEach(item => {
    if (item._id == userId) {
      cardElement.querySelector('.card__like').classList.add('card__like_active')
    }
  })
}
/* функция создания карточки */
export function createNewCard(name, link, myId, cardId, numLike, likeActiveId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__img');
  const remove = cardElement.querySelector('.card__delete');
  const like = cardElement.querySelector('.card__like-number');


  like.textContent = numLike;
  cardImg.setAttribute('alt', name);
  cardImg.setAttribute('src', link)
  cardImg.setAttribute('aria-label', name);
  cardElement.querySelector('.card__title').textContent = name;

  //поставить лайк
  putLike(cardElement, like, cardId);

  //проверить моя ли карточка и сделать активной кнопку удаления
  checkMyCard(myId, remove);
  // удаляет карточку
  deleteCard(remove, cardId, cardElement);

  // При нажатии на картинку в карточке открывает ее полное изображение
  cardImg.addEventListener('click', function () {
      new PopupWithImage(popupImg, link, name ).openPopup();
  })
  //проверрить мой ли лайк стоит
  checkMyLike(cardElement, likeActiveId);

  //заполнить лайк числом
  like.textContent = numLike;
  return cardElement;
}
class Card {
  constructor({data}) {
    this._data = data
  }
  _downloadCards() {
    for (let i = 0; i < result.length; i++) {
      cards.append(createNewCard(result[i].name, result[i].link, result[i].owner._id, result[i]._id, result[i].likes.length, result[i].likes));
    }
  }
}
export function downloadCards(result) {
  for (let i = 0; i < result.length; i++) {
    cards.append(createNewCard(result[i].name, result[i].link, result[i].owner._id, result[i]._id, result[i].likes.length, result[i].likes));
  }
}

export let getCards =  new Promise((resolve, reject) => {
  new Api('cards', 'GET').fetch()
  .then((result) => {
    resolve(result)
  })
  .catch(err => reject(console.error(`Ошибка: ${err.status}`)))
})

