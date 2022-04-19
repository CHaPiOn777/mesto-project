// функция создания карточки
import {closePopup, openPopup} from './utils.js';
import {addImg, closeEscPopup} from './modal.js';

export const popupImg = document.querySelector('.card-img');/*блок формы редктирования картинки*/
export const cardTemplate = document.querySelector('#card-template').content;

export const formCard = document.forms.popupCard;/*форма карточки*/
export const inputCardName = formCard.elements.name;
export const inputCardSubtitle = formCard.elements.subtitle;

export const cards = document.querySelector('.cards');/*карточки*/
export const popupCard = document.querySelector('.popup__card');/*блок формы редктирования профиля*/

export function addNewCard (evt) {
  evt.preventDefault();
  cards.prepend(createNewCard(inputCardName.value, inputCardSubtitle.value));
  formCard.reset();
  closePopup(popupCard);
}


/* функция создания карточки */ 
export function createNewCard (name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__img');
  cardImg.setAttribute('alt', name);
  cardImg.setAttribute('src', link)
  cardImg.setAttribute('aria-label', name);
  cardElement.querySelector('.card__title').textContent = name;
 
  //поставить лайк
  cardElement.querySelector('.card__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like_active');
  })
  
  // удаляет карточку
  cardElement.querySelector('.card__delete').addEventListener('click', function() {
    cardElement.remove();
  })

  // При нажатии на картинку в карточке открывает ее полное изображение
  cardImg.addEventListener('click', function() {
    openPopup(popupImg);
    closeEscPopup(popupImg);
    addImg(name, link)
  })
  return cardElement
}
