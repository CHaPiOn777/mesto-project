// функция создания карточки
import {
  Popup,
  renderLoading
} from './utils.js';
import { 
  userId
} from './index.js';
import {
  addImg
} from './modal.js';
import {
  callServer
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
  callServer('cards', 'POST', ({
      link: inputCardSubtitle.value,
      name: inputCardName.value
    }))
    .then(res => {
      cards.prepend(createNewCard(res.name, res.link, res.owner._id, res._id, res.likes.length, res.likes));
      const popup = new Popup(popupCard);
      popup.closePopup();
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
    callServer(`cards/${cardId}`, 'DELETE')
      .then(() => {
        cardElement.remove();
      })
      .catch(err => console.error(`Ошибка: ${err.status}`))
  })
}

function putLike(cardElement, like, cardId) {
  cardElement.querySelector('.card__like').addEventListener('click', (evt) => {

    if (!evt.target.classList.contains('card__like_active')) {
      callServer(`cards/likes/${cardId}`, 'PUT')
        .then(res => {
          evt.target.classList.toggle('card__like_active');
          like.textContent = res.likes.length;
        })
        .catch(err => console.error(`Ошибка: ${err.status}`))
    } else {
      callServer(`cards/likes/${cardId}`, 'DELETE')
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
    const popup = new Popup(popupImg);
    popup.openPopup();
    addImg(name, link)
  })
  //проверрить мой ли лайк стоит
  checkMyLike(cardElement, likeActiveId);

  //заполнить лайк числом
  like.textContent = numLike;
  return cardElement;
}

export function downloadCards(result) {
  for (let i = 0; i < result.length; i++) {
    cards.append(createNewCard(result[i].name, result[i].link, result[i].owner._id, result[i]._id, result[i].likes.length, result[i].likes));
  }
}

export let getCards =  new Promise((resolve, reject) => {
  callServer('cards', 'GET')
  .then((result) => {
    resolve(result)
  })
  .catch(err => reject(console.error(`Ошибка: ${err.status}`)))
})

