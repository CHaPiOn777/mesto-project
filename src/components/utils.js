import {elementImg, elementName} from './modal';


export class Popup  {
  constructor(selector) {
    this._selector = selector;
    console.log(this._selector);
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
export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }
  openPopup(name, link) {
    super.openPopup();
    this.link = link;
    this.name = name;
    elementImg.setAttribute('src', this.link);
    elementImg.setAttribute('alt',  this.name);
    elementName.textContent = this.name
  }
}
export class PopupWithForm extends Popup {
  constructor(selector, {formSubmitCallback}) {
    super(selector);
    this._formSubmitCallback = formSubmitCallback;
    this._formSubmit = this._formSubmitCallback.bind(this);
    this._form = this._selector.querySelector('.popup__form');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__text'));
    this._submitBtn = this._form.querySelector('.popup__text-button');
  }
  _getInputValues(){
    const data = {};
    this._data = data;
    this._inputs.forEach((item) => {
      data[item.name] = item.value;
    })
    return this._data
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", () => {
      this._getInputValues();
      this._formSubmit(this._submitBtn, this._data);
    });
  }
  closePopup() {
    super.closePopup();
    this._form.reset();
  }
}

export function renderLoading(isLoading, btn) {
  if(isLoading) {
    btn.textContent = `${btn.id}...`
  } else {
    btn.textContent = `${btn.id}`
  }
}

