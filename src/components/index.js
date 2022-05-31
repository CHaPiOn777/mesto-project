import '../style/index.css';
import 'core-js/es/symbol';
import {
  renderLoading,
  PopupWithForm,
  PopupWithImage,
  Popup
} from './utils.js';
import {
  Card,
  getCards,
} from './card.js'
import {

  popupCard,
  formCard,
  cards,
  cardTemplate,
  popupImg
} from './constants.js';

import {
  enableObjectValidation,
  FormValidator
} from './validate.js';

import {
  Api
} from './api.js';
import {
  Section
} from './section.js';

import {
  popupProfile,
  profileName,
  profileDescription,
  inputProfileSubtitle,
  inputProfileName
} from './modal.js';
import UserInfo from './userInfo.js';


const popupProfileButtonEdit = document.querySelector('.profile__edit-button'); /*кнопка редкатирования профиля*/
const popupCardButtonAdd = document.querySelector('.profile__add-button'); /*кнопка добавить попап карточки*/
const profileIcon = document.querySelector('.profile__avatar');
const popupProfileIcon = document.querySelector('.popup__profile-icon');
const formProfileIcon = document.forms.popupProfileIcon;
export let userId;


const getUserInfo = new Promise ((resolve, reject) => {
  new Api('users/me', 'GET').fetch()
  .then((result) => {
    resolve(result)
  })
  .catch(err => reject(console.error(`Ошибка: ${err.status}`)))
})


//загружает аватарку пользователя
new Api('users/me', 'GET').fetch()
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
  const img = new PopupWithImage(popupImg)
  img.openPopup(name, link)
}  

//загружает данные о пользователе и карточки
Promise.all([getUserInfo, getCards])
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
const newInfoProfile = new PopupWithForm(popupProfile, {
  formSubmitCallback: (btnProfile, data) => {
    renderLoading(true, btnProfile);
    new Api('users/me', 'PATCH', ({
      name: data.name,
      about: data.subtitle
    })).fetch()
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
const newCard = new PopupWithForm(popupCard, {
  formSubmitCallback: (btnCard, data) => {
    renderLoading(true, btnCard);
    new Api ('cards', 'POST', ({
      link: data.subtitle,
      name: data.name
    })).fetch()
      .then(res => {
        const card = new Card (res, userId, popupImg, cardTemplate, handleCardClick);
        const cardNew = card.generate();
        cards.prepend(cardNew)
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
const newProfileIcon = new PopupWithForm(popupProfileIcon, {
  formSubmitCallback: (btnProfileIcon, data) => {
    renderLoading(true, btnProfileIcon);
    new Api('users/me/avatar', 'PATCH', ({avatar: data.subtitle})).fetch()
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
  new Popup(popupProfileIcon).openPopup();

  formProfileIcon.reset();
  avatarEditPopopValidation._resetValidation(formProfileIcon);
})

//открывает попап карточек
popupCardButtonAdd.addEventListener('click', function () {
  new Popup(popupCard).openPopup();
  formCard.reset();
  editPopupValidation._resetValidation(formCard);
})
//открывает попап профиля
popupProfileButtonEdit.addEventListener('click', function () {
  new Popup(popupProfile).openPopup();
  const data = userInfo.getUserInfo();
  inputProfileName.value = data.name;
  inputProfileSubtitle.value = data.job;
})