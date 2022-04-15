import {openPopup, closeAllPopup} from './utils.js';
export const elementImg = document.querySelector('.card-img__image');//место ссылки картинки
export const elementName = document.querySelector('.card-img__subtitle');//место имени картинки
export const popupProfile = document.querySelector('.popup__profile');/*блок формы редктирования карточки*/
export const profileName = document.querySelector('.profile__title');/*имя профиля*/
export const profileDescription = document.querySelector('.profile__subtitle');/*описание профиля*/
export const formProfile = document.forms.popupProfile;
export const inputProfileName = formProfile.elements.name;
export const inputProfileSubtitle = formProfile.elements.subtitle;
export const popup = document.querySelectorAll('.popup');


import {closePopup} from './utils.js';

export function saveText(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileSubtitle.value;
  closePopup(popupProfile)
}

//функция добавляет адрес ссылки картинки и название в расширенную картинку
export function addImg(name, link) {
  elementImg.setAttribute('src', link);
  elementImg.setAttribute('alt', name);

  elementName.textContent = name
}

export function closeOverlay() {
  popup.forEach((item) => {
    item.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
        closeAllPopup();
      }
    })
  })
}