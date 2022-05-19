import '../style/index.css';

import {
  openPopup,
  closePopup,
  renderLoading,
  Popup
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
  resetValidation
} from './validate.js';

import {
  callServer,
  Api
} from './api.js';

import {
  getUserInfo,
  handleProfileFormSubmit,
  popupProfile,
  profileName,
  profileDescription,
  formProfile,
  inputProfileSubtitle,
  inputProfileName
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




formCard.addEventListener('submit', () => {
  addNewCard();
});

profileIcon.addEventListener('click', () => {

  new Popup(popupProfileIcon).openPopup();

  formProfileIcon.reset();
  resetValidation(formProfileIcon);
})

formProfileIcon.addEventListener('submit', () => {
  renderLoading(true, btnProfileIcon);
    new Api('users/me/avatar', 'PATCH', ({avatar: inputProfileIcon.value})).fetch()
      .then(res => {
        profileIcon.style.backgroundImage = `url(${inputProfileIcon.value})`;
        const popup = new Popup(popupProfileIcon);
        popup.closePopup();
      })
      .catch(err => console.error(`Ошибка: ${err.status}`))
      .finally(res => {
        renderLoading(false, btnProfileIcon);
      
      });

});

new Api('users/me', 'GET').fetch()
  .then((result) => {
    profileIcon.style.backgroundImage = `url(${result.avatar})`;
  })
  .catch(err => console.error(`Ошибка: ${err.status}`));

enableValidation(enableObjectValidation);

//открывает попап профиля


//открывает попап карточек
popupCardButtonAdd.addEventListener('click', function () {
  new Popup(popupCard).openPopup();
  formCard.reset();
  resetValidation(formCard);
})

popupProfileButtonEdit.addEventListener('click', function () {
  new Popup(popupProfile).openPopup();
  inputProfileName.value = profileName.textContent;
  inputProfileSubtitle.value = profileDescription.textContent;
})




//сохраняет введенные данные в попап профиля
formProfile.addEventListener('submit',() => {
  renderLoading(true, btnProfile);
  new Api('users/me', 'PATCH', ({name: inputProfileName.value,about: inputProfileSubtitle.value})).fetch()
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
  