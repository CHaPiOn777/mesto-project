import {popupImg, popupCard} from './card.js';
import {popupProfile} from './modal.js';

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
}

export function closeAllPopup() {
  closePopup(popupCard);
  closePopup(popupProfile);
  closePopup(popupImg);
}