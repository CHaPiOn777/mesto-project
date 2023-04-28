export class Popup  {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._selector = popupSelector;
  }
  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose); 
  }
  openPopup() {    
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }
  setEventListeners(){
    this._popup.addEventListener('mousedown', (evt) => {
        if(evt.target.classList.contains('popup_opened')) {
          this.closePopup();
        }
        if(evt.target.classList.contains('popup__img')) {
          this.closePopup();
        }
      })
  }
}