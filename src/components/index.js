import '../style/index.css';
import 'core-js/es/symbol';


import {
  PopupWithImage
} from './PopupWithImage.js';
import {
  PopupWithForm
} from './PopupWithForm.js';

import {
  Card,
} from './Card.js'

import {
  popupImg,
  cardTemplate,
  formCard,
  popupProfile,
  profileName,
  profileDescription,
  inputProfileName,
  inputProfileSubtitle,
  popupProfileButtonEdit,
  popupCardButtonAdd,
  profileIcon,
  formProfileIcon
} from './Constants.js';

import {
  enableObjectValidation,
  FormValidator
} from './FormValidator.js';

import {
  Section
} from './Section.js';

import UserInfo from './UserInfo.js';
import Api from './Api.js';

export const api = new Api({
  serverUrl: "https://nomoreparties.co/v1/plus-cohort-9/",
  token: "4aa45065-cf66-4840-9e29-974284b6da3e",
});
let userId;
const initialData = [api.getUserInfo(), api.getInitialCards()];

export function renderLoading(isLoading, btn) {
  if(isLoading) {
    btn.textContent = `${btn.id}...`
  } else {
    btn.textContent = `${btn.id}`
  }
}
//Создание карточки
const createCard = (data) => {
  const card = new Card(data, userId, popupImg, cardTemplate, handleCardClick, api);
  const createCard = card.generate();
  return createCard;
}
//Загрузка карточки
const downloadCard = new Section({
    renderer: (item) => {
      downloadCard.addItems(createCard(item));
    }
  }, '.cards') 

//функция открывает попа с изображением
function handleCardClick(name, link) {
  const img = new PopupWithImage('.card-img');
  img.openPopup(name, link);
}  


//загружает данные о пользователе и карточки
Promise.all(initialData)
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData)
    userId = userData._id;
    downloadCard.renderItems(cards);
  })
  .catch(err => console.error(`Ошибка: ${err.status}`))

const userInfo = new UserInfo(profileName, profileDescription, profileIcon, userId);

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
        userInfo.setUserInfo(res)
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
        downloadCard.prependCard(card);
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
        userInfo.setUserInfo(res)
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
  newProfileIcon.openPopup();
  avatarEditPopopValidation.resetValidation();
})

//открывает попап карточек
popupCardButtonAdd.addEventListener('click', function () {
  newCard.openPopup();
  editPopupValidation.resetValidation();
})
//открывает попап профиля
popupProfileButtonEdit.addEventListener('click', function () {
  newInfoProfile.openPopup();
  const data = userInfo.getUserInfo();
  inputProfileName.value = data.name;
  inputProfileSubtitle.value = data.job;
})