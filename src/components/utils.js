import {closeEscPopup} from './modal.js';


export class Popup  {
  constructor(selector) {
    this._selector = selector;
  }
  closePopup() {
    this._selector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose); 
  }
  openPopup() {    
    this._selector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this.setEventListeners();
  }
  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      const popupEsc = new Popup(openedPopup);
      popupEsc.closePopup();
    }
  }
  setEventListeners(){
    this._selector.addEventListener('mousedown', (evt) => {
        if(evt.target.classList.contains('popup_opened')) {
          const popupItem = new Popup(this._selector);
          popupItem.closePopup();
        }
        if(evt.target.classList.contains('popup__img')) {
          const popupItem = new Popup(this._selector);
          popupItem.closePopup();
        }
      })
  }
}


/* export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscPopup); 
}
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscPopup);
} */
export function renderLoading(isLoading, btn) {
  if(isLoading) {
    btn.textContent = `${btn.id}...`
  } else {
    btn.textContent = `${btn.id}`
  }
}

