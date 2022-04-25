// функция создания карточки
import {closePopup, openPopup} from './utils.js';
import {addImg, closeEscPopup} from './modal.js';
import {callServer} from './api.js';

export const popupImg = document.querySelector('.card-img');/*блок формы редктирования картинки*/
export const cardTemplate = document.querySelector('#card-template').content;

export const formCard = document.forms.popupCard;/*форма карточки*/
export const inputCardName = formCard.elements.name;
export const inputCardSubtitle = formCard.elements.subtitle;

export const cards = document.querySelector('.cards');/*карточки*/
export const popupCard = document.querySelector('.popup__card');/*блок формы редктирования профиля*/


export function addNewCard (evt) {

  
  const remove = cards.querySelector('.delete__card');
  callServer('cards', 'POST', ({
    link: inputCardSubtitle.value,
    name: inputCardName.value
  }))
  cards.prepend(createNewCard(inputCardName.value, inputCardSubtitle.value));

  formCard.reset();
  closePopup(popupCard);

}

function checkMyCard(id, icon) {
  if(id !== '12b8ae712c461ad10ad8a065') {
    icon.style.display = 'none';
  }
}

/* функция создания карточки */ 
export function createNewCard (name, link, id, cardId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__img');
  const remove = cardElement.querySelector('.card__delete');
  cardImg.setAttribute('alt', name);
  cardImg.setAttribute('src', link)
  cardImg.setAttribute('aria-label', name);
  cardElement.querySelector('.card__title').textContent = name;
  

  //поставить лайк
  cardElement.querySelector('.card__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like_active');
  })
  console.log(id);
  checkMyCard(id, remove);
  // удаляет карточку
  remove.addEventListener('click', function() {

    callServer(`cards/${cardId}`, 'DELETE')
    .then(() => {
        cardElement.remove();
    })
  })



  // При нажатии на картинку в карточке открывает ее полное изображение
  cardImg.addEventListener('click', function() {
    openPopup(popupImg);
    closeEscPopup(popupImg);
    addImg(name, link)
  })

  return cardElement
}

export function downloadCards(result) {
  for (let i = 0; i < result.length; i++) {
    cards.append(createNewCard(result[i].name, result[i].link, result[i].owner._id, result[i]._id));
  }
}