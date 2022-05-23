import {closeEscPopup} from './modal.js';
import {elementImg, elementName} from './modal';


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
export class PopupWithImage extends Popup {
  constructor(selector, link, name) {
    super(selector);
    this.link = link;
    this.name = name;
  }
  openPopup() {
    super.openPopup();
    elementImg.setAttribute('src', this.link);
    elementImg.setAttribute('alt',  this.name);
  
    elementName.textContent = this.name
  }
}
// export class PopupWithForm extends Popup {
//   constructor(selector, Api) {
//     super(selector)
    
//   }

//   _getInputValues() {
//     const data = {};
//     this._inputs.forEach((input) => {
//       data[input.name] = input.value;
//     });
//     return data;
//   }
//   setEventListeners() {
//     super.setEventListeners();
//     this.selector.addEventListener("submit",() => {
      
//     } this.Api);
//     formProfileIcon.addEventListener('submit', () => {
//       renderLoading(true, btnProfileIcon);
//         new Api('users/me/avatar', 'PATCH', ({avatar: inputProfileIcon.value})).fetch()
//           .then(res => {
//             profileIcon.style.backgroundImage = `url(${inputProfileIcon.value})`;
//             const popup = new Popup(popupProfileIcon);
//             popup.closePopup();
//           })
//           .catch(err => console.error(`Ошибка: ${err.status}`))
//           .finally(res => {
//             renderLoading(false, btnProfileIcon);
          
//           });
//     });
//   }
//   closePopup() {
//     super.closePopup();
//     this.selector.reset();
//   }
// }
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

