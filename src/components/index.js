import '../style/index.css';
import 'core-js/es/symbol';
import {
  openPopup,
  closePopup,
  renderLoading,
  PopupWithForm,
  Popup
} from './utils.js';

import {
  getCards,
  addNewCard,
  popupCard,
  formCard,
  cards,
  Card,
  popupImg,
  inputCardSubtitle,
  inputCardName,
  downloadCards
} from './card.js';

import {
  enableValidation,
  enableObjectValidation,
  resetValidation,
  FormValidator
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



// formCard.addEventListener('submit', () => {
//   addNewCard();
// });
const newCard = new PopupWithForm(popupCard, {
  formSubmitCallback: (btnCard, data) => {
    renderLoading(true, btnCard);
    new Api ('cards', 'POST', ({
      link: data.subtitle,
      name: data.name
    })).fetch()
      .then(res => {
        const card = new Card (res, userId, popupImg);
        const cardNew = card.generate();
        cards.prepend(cardNew)
        new Popup(popupCard).closePopup();
        formCard.reset();
      })
      .catch(err => console.error(`Ошибка: ${err.status}`))
      .finally(res => {
        renderLoading(false, btnCard);
      });
  }
})

newCard.setEventListeners();


profileIcon.addEventListener('click', () => {

  new Popup(popupProfileIcon).openPopup();

  formProfileIcon.reset();
  avatarEditPopopValidation._resetValidation(formProfileIcon);
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

/* enableValidation(enableObjectValidation); */


//открывает попап профиля


//открывает попап карточек
popupCardButtonAdd.addEventListener('click', function () {
  new Popup(popupCard).openPopup();
  formCard.reset();
  editPopupValidation._resetValidation(formCard);
})

popupProfileButtonEdit.addEventListener('click', function () {
  new Popup(popupProfile).openPopup();
  inputProfileName.value = profileName.textContent;
  inputProfileSubtitle.value = profileDescription.textContent;
  addPopupValidation._resetValidation(popupProfile);
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
    new Card(cards, userId, popupImg ).downloadCards()
    // downloadCards(cards);
  })
  .catch(err => console.error(`Ошибка: ${err.status}`))
  