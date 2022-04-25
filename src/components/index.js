import '../style/index.css';

import {
  openPopup,
  closePopup
} from './utils.js';

import {
  downloadCards,
  addNewCard,
  checkMyCard,
  popupCard,
  formCard
} from './card.js';

import {
  enableValidation,
  enableObjectValidation,
  resetValidation
} from './validate.js';

import {
  callServer
} from './api.js';

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
const profileIcon = document.querySelector('.profile__avatar');
const popupProfileIcon = document.querySelector('.popup__profile-icon');
const formProfileIcon = document.forms.popupProfileIcon;
const inputProfileIcon = formProfileIcon.elements.subtitle;




formCard.addEventListener('submit', (evt) => {
  addNewCard(evt);

  resetValidation(formCard);
});

profileIcon.addEventListener('click', () => {
  openPopup(popupProfileIcon);
  formProfileIcon.reset();
  resetValidation(formProfileIcon);
})

formProfileIcon.addEventListener('submit', () => {
  profileIcon.style.backgroundImage = `url(${inputProfileIcon.value})`;
  callServer('users/me/avatar', 'PATCH', ({
    avatar: inputProfileIcon.value
  }));
  closePopup(popupProfileIcon);
});

callServer('users/me', 'GET')
  .then((result) => {
    profileIcon.style.backgroundImage = `url(${result.avatar})`;
  })



enableValidation(enableObjectValidation);

//открывает попап профиля


//открывает попап карточек
popupCardButtonAdd.addEventListener('click', function () {
  openPopup(popupCard);
  formCard.reset();
})

popupProfileButtonEdit.addEventListener('click', function () {
  openPopup(popupProfile);
  inputProfileName.value = profileName.textContent;
  inputProfileSubtitle.value = profileDescription.textContent;
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
formProfile.addEventListener('submit',() => {
  callServer('users/me', 'PATCH', ({
    name: inputProfileName.value,
    about: inputProfileSubtitle.value
  }));
  handleProfileFormSubmit();
})


callServer('cards', 'GET')
  .then((result) => {
    downloadCards(result);
    console.log(result);
  }); 

callServer('users/me', 'GET')
  .then((result) => {
    profileName.textContent = result.name;
    profileDescription.textContent = result.about;
  })




