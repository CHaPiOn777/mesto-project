import '../style/index.css';

import {
  openPopup,
  closePopup,
  renderLoading
} from './utils.js';

import {
  getCards,
  addNewCard,
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




formCard.addEventListener('submit', () => {
  addNewCard();
});

profileIcon.addEventListener('click', () => {
  openPopup(popupProfileIcon);
  formProfileIcon.reset();
  resetValidation(formProfileIcon);
})

formProfileIcon.addEventListener('submit', () => {
  renderLoading(true, btnProfileIcon);

  callServer('users/me/avatar', 'PATCH', ({
    avatar: inputProfileIcon.value
  }))
    .then(res => profileIcon.style.backgroundImage = `url(${inputProfileIcon.value})`)
    .catch(err => console.error(`Ошибка: ${err.status}`))
    .finally(res => {
      renderLoading(false, btnProfileIcon);
      closePopup(popupProfileIcon);
    });

});

callServer('users/me', 'GET')
  .then((result) => {
    profileIcon.style.backgroundImage = `url(${result.avatar})`;
  })
  .catch(err => console.error(`Ошибка: ${err.status}`));

enableValidation(enableObjectValidation);

//открывает попап профиля


//открывает попап карточек
popupCardButtonAdd.addEventListener('click', function () {
  openPopup(popupCard);
  formCard.reset();
  resetValidation(formCard);
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
  renderLoading(true, btnProfile);
  callServer('users/me', 'PATCH', ({
    name: inputProfileName.value,
    about: inputProfileSubtitle.value
  }))
    .then(res => handleProfileFormSubmit())
    .catch(err => console.error(`Ошибка: ${err.status}`))
    .finally(res => renderLoading(false, btnProfile));

})

  Promise.all([getUserInfo(), getCards()])
    .then(i => console.log(i))
    .catch(err => console.error(`Ошибка: ${err.status}`));
  