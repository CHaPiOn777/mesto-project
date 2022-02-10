let button_edit = document.querySelector('.profile__edit-button');/*кнопка редкатирования профиля*/
let popup_profile = document.querySelector('.popup');/*блок формы редктирования профиля*/
let button_edit_close = document.querySelector('.popup__img');/*кнопка закрытия профиля*/
let profile_name = document.querySelector('.profile__title');/*имя профиля*/
let description_profile = document.querySelector('.profile__subtitle');/*описание профиля*/
let button_save = document.querySelector('.popup__text-button');/*кнопка сохранить*/
let name_title = document.querySelector('#name');/*имя в форме*/
let subtitle = document.querySelector('#subtitle');/*описание в форме*/
let card = document.querySelector('.cards');/*карточки*/
let button_add = document.querySelector('.profile__add-button');/*кнопка добавить*/
let popup_card = document.querySelector('#popup_add_card');/*попап добавления карточек*/
let button_new = document.querySelector('#button_new');/*кнопка добавить в карточке*/
let button_add_close = document.querySelector('#button_add_close');/*кнопка закрытия попапа карточек*/


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 



function buttonClick(button, name_popup) /*функция открывает форму при нажатии на кнопку*/ {
  button.addEventListener('click', function() {
    name_popup.classList.toggle('popup_opened');
  });
}


function Inner()/*ф-ия изменения имени и описания*/ {
  profile_name.innerHTML = `${name_title.value}`;
  description_profile.innerHTML = `${subtitle.value}`;
  popup_profile.classList.toggle('popup_opened');
}

buttonClick(button_edit, popup_profile);
buttonClick(button_edit_close, popup_profile);
buttonClick(button_add, popup_card);
buttonClick(button_add_close, popup_card);

button_save.addEventListener('click', Inner);

for (let i = 0; i < initialCards.length; i++) {
  card.insertAdjacentHTML('afterbegin', `
  <div class="card">
    <img src="${initialCards[i]['link']}" alt="${initialCards[i]['name']}" class="card__img">
    <div class="card__name-city">
      <h2 class="card__title">${initialCards[i]['name']}</h2>
      <button class="card__like" type="button" aria-label="Кнопка поставить лайк"></button>
    </div>
  </div>
`);
}