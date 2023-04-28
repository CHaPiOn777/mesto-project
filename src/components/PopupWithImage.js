import {
  Popup
} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._elementImg = document.querySelector('.card-img__image');
    this._elementName = document.querySelector('.card-img__subtitle');
  }
  openPopup(name, link) {
    super.openPopup();
    this.link = link;
    this.name = name;
    this._elementImg.setAttribute('src', this.link);
    this._elementImg.setAttribute('alt',  this.name);
    this._elementName.textContent = this.name
  }
}