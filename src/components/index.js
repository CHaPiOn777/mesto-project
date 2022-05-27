import '../style/index.css';
import 'core-js/es/symbol';
import {
  openPopup,
  closePopup,
  renderLoading
} from './utils.js';

import {
  getCards,
  addNewCard,
  popupCard,
  formCard,
  downloadCards
} from './card.js';

import {
  enableValidation,
  enableObjectValidation,
  resetValidation,
  FormValidator
} from './validate.js';

import {
  callServer
} from './api.js';

import {
  getUserInfo,
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
const btnProfile = document.querySelector('.btn-profile');
const btnProfileIcon = document.querySelector('.btn-profile-icon');
export let userId;

const editPopupValidation = new FormValidator(
  enableObjectValidation,
  formCard
);

const addPopupValidation  = new FormValidator(
  enableObjectValidation,
  popupProfile
);

const avatarEditPopopValidation  = new FormValidator(
  enableObjectValidation,
  formProfileIcon
);

avatarEditPopopValidation.enableValidation();
editPopupValidation.enableValidation();
addPopupValidation.enableValidation();



formCard.addEventListener('submit', () => {
  addNewCard();
});

profileIcon.addEventListener('click', () => {
  openPopup(popupProfileIcon);

  formProfileIcon.reset();
  avatarEditPopopValidation._resetValidation(formProfileIcon);
})

formProfileIcon.addEventListener('submit', () => {
  renderLoading(true, btnProfileIcon);

  callServer('users/me/avatar', 'PATCH', ({
    avatar: inputProfileIcon.value
  }))
    .then(res => {
      profileIcon.style.backgroundImage = `url(${inputProfileIcon.value})`
      closePopup(popupProfileIcon);
    })
    .catch(err => console.error(`Ошибка: ${err.status}`))
    .finally(res => {
      renderLoading(false, btnProfileIcon);
 
    });

});

callServer('users/me', 'GET')
  .then((result) => {
    profileIcon.style.backgroundImage = `url(${result.avatar})`;
  })
  .catch(err => console.error(`Ошибка: ${err.status}`));

/* enableValidation(enableObjectValidation); */


//открывает попап профиля


//открывает попап карточек
popupCardButtonAdd.addEventListener('click', function () {
  openPopup(popupCard);
  formCard.reset();
  editPopupValidation._resetValidation(formCard);
})

popupProfileButtonEdit.addEventListener('click', function () {
  openPopup(popupProfile);
  inputProfileName.value = profileName.textContent;
  inputProfileSubtitle.value = profileDescription.textContent;
  addPopupValidation._resetValidation(popupProfile);
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
  renderLoading(true, btnProfile);
  callServer('users/me', 'PATCH', ({
    name: inputProfileName.value,
    about: inputProfileSubtitle.value
  }))
    .then(res => handleProfileFormSubmit())
    .catch(err => console.error(`Ошибка: ${err.status}`))
    .finally(res => renderLoading(false, btnProfile));

})

Promise.all([getUserInfo, getCards])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    userId = userData._id;
    downloadCards(cards);
  })
  .catch(err => console.error(`Ошибка: ${err.status}`))
  