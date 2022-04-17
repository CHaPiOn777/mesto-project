import {openPopup, closeAllPopup, closePopup} from './utils.js';
const page = document.querySelector('.page');
export const elementImg = document.querySelector('.card-img__image');//место ссылки картинки
export const elementName = document.querySelector('.card-img__subtitle');//место имени картинки
export const popupProfile = document.querySelector('.popup__profile');/*блок формы редктирования карточки*/
export const profileName = document.querySelector('.profile__title');/*имя профиля*/
export const profileDescription = document.querySelector('.profile__subtitle');/*описание профиля*/
export const formProfile = document.forms.popupProfile;
export const inputProfileName = formProfile.elements.name;
export const inputProfileSubtitle = formProfile.elements.subtitle;
export const popups = document.querySelectorAll('.popup');


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
  popups.forEach((item) => {
    item.addEventListener('click', (evt) => {
      console.log(evt.target);
      if (evt.target.classList.contains('popup')) {
        closeAllPopup();
      }
    })
  })
}

export function closeEscPopup (popup) {
  page.addEventListener('keyup', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  })
}