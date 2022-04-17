export const enableObjectValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__text-button',
  inactiveButtonClass: 'popup__text-button_inactive',
  inputErrorClass: 'popup__text_error',
  errorClass: 'popup__error_active'
}; 

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
}; 
const toggleButtonState = (inputList, btn, options) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    btn.disabled = true;
    btn.classList.add(options.inactiveButtonClass);
  } else {
    btn.classList.remove(options.inactiveButtonClass);
    btn.disabled = false;
  }
}; 

function isValid(inputItem, formItem, options) {
  const valid = inputItem.validity.valid;
  if (!valid) {
    showInputError(formItem, inputItem, inputItem.validationMessage, options);
  } else {
    hideInputError(formItem, inputItem, options);
  }
}

function showInputError(formElement, inputElement, textError, options) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(options.inputErrorClass);
  errorElement.textContent = textError;
  errorElement.classList.add(options.errorClass);
}
function hideInputError(formElement, inputElement, options) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(options.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(options.errorClass);
}

export function enableValidation(options) {
  const allForm = Array.from(document.querySelectorAll(options.formSelector));
  allForm.forEach((item) => {
    item.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(item, options);
  });
};

function setEventListeners(inputElement, options) {
  const inputList = Array.from(inputElement.querySelectorAll(options.inputSelector));
  const btn = inputElement.querySelector(options.submitButtonSelector);
  toggleButtonState(inputList, btn, options);
  inputList.forEach((item) => {
    item.addEventListener('input', () => {
      isValid(item, inputElement, options);
      toggleButtonState(inputList, btn, options);
    })
  }); 

}