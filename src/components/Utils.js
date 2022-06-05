export class Popup  {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._selector = popupSelector;
    console.log(popupSelector);

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

export function renderLoading(isLoading, btn) {
  if(isLoading) {
    btn.textContent = `${btn.id}...`
  } else {
    btn.textContent = `${btn.id}`
  }
}

