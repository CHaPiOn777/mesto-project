import {
  Popup
} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, {formSubmitCallback}) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._formSubmit = this._formSubmitCallback.bind(this);
    this._form = this._popup.querySelector('.popup__form');
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