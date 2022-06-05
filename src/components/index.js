import '../style/index.css';
import 'core-js/es/symbol';
import {
  renderLoading,
  PopupWithForm,
  PopupWithImage,
  Popup
} from './Utils.js';
import {
  Card,
  getCards,
} from './Card.js'
import {

  popupCard,
  formCard,
  cards,
  cardTemplate,
  popupImg
} from './Constants.js';

import {
  enableObjectValidation,
  FormValidator
} from './FormValidator.js';


import {
  Section
} from './Section.js';

import {
  popupProfile,
  profileName,
  profileDescription,
  inputProfileSubtitle,
  inputProfileName
} from './Modal.js';
import UserInfo from './UserInfo.js';
import Api from './api.js';


const popupProfileButtonEdit = document.querySelector('.profile__edit-button'); /*кнопка редкатирования профиля*/
const popupCardButtonAdd = document.querySelector('.profile__add-button'); /*кнопка добавить попап карточки*/
const profileIcon = document.querySelector('.profile__avatar');
const popupProfileIcon = document.querySelector('.popup__profile-icon');
const formProfileIcon = document.forms.popupProfileIcon;
export let userId;

export const api = new Api({
  serverUrl: "https://nomoreparties.co/v1/plus-cohort-9/",
  token: "4aa45065-cf66-4840-9e29-974284b6da3e",
});

const initialData = [api.getUserInfo(), api.getInitialCards()];

//загружает аватарку пользователя
api.getAva()
  .then((result) => {
    userInfo.setUserAvatar(result);
  })
  .catch(err => console.error(`Ошибка: ${err.status}`));

//Создание карточки
const createCard = (data) => {
  const card = new Card(data, userId, popupImg, cardTemplate, handleCardClick);
  const createCard = card.generate();
  return createCard
}
//Загрузка карточки
const downloadCard = new Section({
    renderer: (item) => {
      downloadCard.addItems(createCard(item));
    }
  }, '.cards') 

//функция открывает попа с изображением
function handleCardClick(name, link) {
  const img = new PopupWithImage('.card-img')
  img.openPopup(name, link)
}  

//загружает данные о пользователе и карточки
Promise.all(initialData)
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData)
    userId = userData._id;
    downloadCard.renderItems(cards);
  })
  .catch(err => console.error(`Ошибка: ${err.status}`))

const userInfo = new UserInfo(profileName, profileDescription, profileIcon);

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

//сохраняет введенные данные профиля
const newInfoProfile = new PopupWithForm('.popup__profile', {
  formSubmitCallback: (btnProfile, data) => {
    renderLoading(true, btnProfile);
    api.editProfile(data)
      .then(res => {
        profileName.textContent = res.name;
        profileDescription.textContent = res.about;
        newInfoProfile.closePopup();
      })
      .catch(err => console.error(`Ошибка: ${err.status}`))
      .finally(res => renderLoading(false, btnProfile));
  }
})
newInfoProfile.setEventListeners();

//сохраняет введенные данные карточки
const newCard = new PopupWithForm('.popup__card', {
  formSubmitCallback: (btnCard, data) => {
    renderLoading(true, btnCard);
    api.addNewCard(data)
      .then(res => {
        const card = createCard(res);
        new Section({}, '.cards').prependCard(card);
        newCard.closePopup();
      })
      .catch(err => console.error(`Ошибка: ${err.status}`))
      .finally(res => {
        renderLoading(false, btnCard);
      });
  }
})
newCard.setEventListeners();

//сохраняет введенные данные аватара профиля
const newProfileIcon = new PopupWithForm('.popup__profile-icon', {
  formSubmitCallback: (btnProfileIcon, data) => {
    renderLoading(true, btnProfileIcon);
    api.editAvatar(data)
      .then(res => {
        profileIcon.style.backgroundImage = `url(${res.avatar})`;
        newProfileIcon.closePopup();
      })
      .catch(err => console.error(`Ошибка: ${err.status}`))
      .finally(res => {
        renderLoading(false, btnProfileIcon);
      });
  }
})
newProfileIcon.setEventListeners();

//открывает попап аватара 
profileIcon.addEventListener('click', () => {
  new PopupWithForm('.popup__profile-icon', {formSubmitCallback: () =>{}}).openPopup();
  formProfileIcon.reset();
  avatarEditPopopValidation._resetValidation(formProfileIcon);
})

//открывает попап карточек
popupCardButtonAdd.addEventListener('click', function () {
  new PopupWithForm('.popup__card', {formSubmitCallback: () =>{}}).openPopup();
  formCard.reset();
  editPopupValidation._resetValidation(formCard);
})
//открывает попап профиля
popupProfileButtonEdit.addEventListener('click', function () {
  new PopupWithForm('.popup__profile', {formSubmitCallback: () =>{}}).openPopup();
  const data = userInfo.getUserInfo();
  inputProfileName.value = data.name;
  inputProfileSubtitle.value = data.job;
})