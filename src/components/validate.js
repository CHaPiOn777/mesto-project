export const enableObjectValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__text-button',
  inactiveButtonClass: 'popup__text-button_inactive',
  inputErrorClass: 'popup__text_error',
  errorClass: 'popup__error_active'
};


export class FormValidator{
  constructor(enableObject, popupForm){
    this._popupForm = popupForm
    this._enableObject = enableObject
    this._formSelector = enableObject.formSelector;
    this._inputSelector = enableObject.inputSelector;
    this._submitButtonSelector = enableObject.submitButtonSelector;
    this._inactiveButtonClass = enableObject.inactiveButtonClass;
    this._inputErrorClass = enableObject.inputErrorClass;
    this._errorClass = enableObject.errorClass;
    this._allForm = Array.from(document.querySelectorAll(this._formSelector));
  }
  _resetValidation(form) {
    
    this._btn = form.querySelector(this._submitButtonSelector);
    if(this._btn) {
      this._toggleButtonState();
    }
  }
  _hasInvalidInput() {
    this._inputList = Array.from(this._popupForm.querySelectorAll(this._inputSelector));
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
  
      return !inputElement.validity.valid;
    })
  }; 
  _toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    this._btn = this._popupForm.querySelector(this._submitButtonSelector);
    if (this._hasInvalidInput()) {
      this._btn.disabled = true;
      this._btn.classList.add(this._inactiveButtonClass);
    } else {
      this._btn.classList.remove(this._inactiveButtonClass);
      this._btn.disabled = false;
    }
  }; 
  
  _isValid(inputItem) {
    this._valid = inputItem.validity.valid;
    if (!this._valid) {
      this._showInputError(inputItem, inputItem.validationMessage);
    } else {
      this._hideInputError(inputItem);
    }
  }
  
  _showInputError( inputElement, textError) {
    this._errorElement = this._popupForm.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = textError;
    this._errorElement.classList.add(this._errorClass);
  }

  _hideInputError( inputElement) {   
    this._errorElement = this._popupForm.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = '';
    this._errorElement.classList.remove(this._errorClass);
  }
  
  enableValidation() {
    this._allForm.forEach((item) => {
      item.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
    });
  };
  
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList = Array.from(this._popupForm.querySelectorAll(this._inputSelector));
    this._inputList.forEach((item) => {
      item.addEventListener('input', () => {
        this._isValid(item);
        this._toggleButtonState();
      })
    });
  }
} 
