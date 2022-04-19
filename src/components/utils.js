import {closeEscPopup} from './modal.js';
import {enableObjectValidation, toggleButtonState} from './validate.js';

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscPopup); 
}

export function openPopup(popup) {

  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscPopup);
}


