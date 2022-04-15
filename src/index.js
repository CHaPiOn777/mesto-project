import '../pages/index.css';

import {openPopup, closeAllPopup} from './utils.js';
import {newCard, submitFormHandler, cards, popupCard, formCard, addLike} from './card.js';
import {enableValidation, enableObjectValidation} from './validate.js';
import {closeOverlay, saveText, popupProfile, profileName, profileDescription, formProfile, inputProfileSubtitle, inputProfileName} from './modal.js';


const page = document.querySelector('.page');

const popupProfileButtonEdit = document.querySelector('.profile__edit-button');/*кнопка редкатирования профиля*/

const buttonsClose = document.querySelectorAll('.popup__img');/*кнопки закрытия попа*/


const popupCardButtonAdd = document.querySelector('.profile__add-button');/*кнопка добавить попап карточки*/


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 


enableValidation(enableObjectValidation);

formCard.addEventListener('submit', submitFormHandler); 

closeOverlay();

//открывает попап профиля
popupProfileButtonEdit.addEventListener('click', function() {
  openPopup(popupProfile);
  inputProfileName.value = profileName.textContent;
  inputProfileSubtitle.value = profileDescription.textContent;
})

//открывает попап карточек
popupCardButtonAdd.addEventListener('click', function() {
  openPopup(popupCard);
  formCard.reset();
})

//кнопка закрытия
buttonsClose.forEach(function(del) {
  del.addEventListener('click', function(){
      closeAllPopup()
    })
})

//сохраняет введенные данные в попап профиля
formProfile.addEventListener('submit', saveText);

/* цикл загружает 6 карточек */
initialCards.forEach(function (item) {
  cards.append(newCard(item['name'], item['link']));
})

//закрытие на Esc
page.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeAllPopup();
  }
})

//Поставить лайк
addLike();

