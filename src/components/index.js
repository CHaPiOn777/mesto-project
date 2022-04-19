import '../style/index.css';

import {
  openPopup,
  closePopup
} from './utils.js';

import {
  createNewCard,
  addNewCard,
  cards,
  popupCard,
  formCard
} from './card.js';

import {
  enableValidation,
  enableObjectValidation,
  resetValidation
} from './validate.js';

import {
  handleProfileFormSubmit,
  popupProfile,
  profileName,
  profileDescription,
  formProfile,
  inputProfileSubtitle,
  inputProfileName,
  popups
} from './modal.js';

const popupProfileButtonEdit = document.querySelector('.profile__edit-button'); /*кнопка редкатирования профиля*/
const popupCardButtonAdd = document.querySelector('.profile__add-button'); /*кнопка добавить попап карточки*/

const initialCards = [{
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




formCard.addEventListener('submit', (evt) => {
  addNewCard(evt);
  resetValidation(formCard);
});


enableValidation(enableObjectValidation);

//открывает попап профиля
popupProfileButtonEdit.addEventListener('click', function () {
  openPopup(popupProfile);
  inputProfileName.value = profileName.textContent;
  inputProfileSubtitle.value = profileDescription.textContent;
})

//открывает попап карточек
popupCardButtonAdd.addEventListener('click', function () {
  openPopup(popupCard);
  formCard.reset();
})



//кнопка закрытия
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if(evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if(evt.target.classList.contains('popup__img')) {
      closePopup(popup);
    }
  })
})


//сохраняет введенные данные в попап профиля
formProfile.addEventListener('submit', handleProfileFormSubmit);

/* цикл загружает 6 карточек */
initialCards.forEach(function (item) {
  cards.append(createNewCard(item['name'], item['link']));
})
