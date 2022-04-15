// функция создания карточки
import {closePopup, openPopup} from './utils.js';
import {saveText, addImg} from './modal.js';

export const popupImg = document.querySelector('.card-img');/*блок формы редктирования картинки*/
export const cardTemplate = document.querySelector('#card-template').content;

export const formCard = document.forms.popupCard;/*форма карточки*/
export const inputCardName = formCard.elements.name;
export const inputCardSubtitle = formCard.elements.subtitle;

export const cards = document.querySelector('.cards');/*карточки*/
export const popupCard = document.querySelector('.popup__card');/*блок формы редктирования профиля*/

export function submitFormHandler (evt) {
  evt.preventDefault();
  cards.prepend(newCard(inputCardName.value, inputCardSubtitle.value));
  formCard.reset();
  closePopup(popupCard)
}


/* функция создания карточки */ 
export function newCard (name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__img').setAttribute('alt', name);
  cardElement.querySelector('.card__img').setAttribute('src', link)
  cardElement.querySelector('.card__img').setAttribute('aria-label', name);
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__like').setAttribute('aria-label', 'Кнопка поставить лайк');
  cardElement.querySelector('.card__delete').setAttribute('aria-label', 'Удалить карточку');
  
  //ставит лайк
  // cardElement.querySelector('.card__like').addEventListener('click', function(evt) {
  //   evt.target.classList.toggle('card__like_active');
  // })
  // удаляет карточку
  cardElement.querySelector('.card__delete').addEventListener('click', function() {
    cardElement.remove();
  })

  // При нажатии на картинку в карточке открывает ее полное изображение
  cardElement.querySelector('.card__img').addEventListener('click', function() {
    openPopup(popupImg);
    addImg(name, link)
  })
  return cardElement
}
export function addLike() {
  cards.addEventListener('click', function(evt) {
    if(evt.target.classList.contains('card__like')) {
      evt.target.classList.toggle('card__like_active');
    }
  })
}