const popupProfile_buttonEdit = document.querySelector('.profile__edit-button');/*кнопка редкатирования профиля*/
const popupProfile = document.querySelector('.popup');/*блок формы редктирования профиля*/
const popupProfile_buttonEditClose = document.querySelector('.popup__img');/*кнопка закрытия профиля*/
const profile_name = document.querySelector('.profile__title');/*имя профиля*/
const profile_description = document.querySelector('.profile__subtitle');/*описание профиля*/
const popupProfile_buttonSave = document.querySelector('.popup__text-button');/*кнопка сохранить*/

const popupProfile_nameTitle = document.querySelector('#name');/*имя в форме*/
const popupProfile_description = document.querySelector('#subtitle');/*описание в форме*/

const popupCard_nameTitle = document.querySelector('#name_card');/*имя в форме*/
const popupCard_description = document.querySelector('#subtitle_card');/*описание в форме*/

const cards = document.querySelector('.cards');/*карточки*/
const popupCard_buttonAdd = document.querySelector('.profile__add-button');/*кнопка добавить попап карточки*/
const popupCard = document.querySelector('#popup_add_card');/*попап добавления карточек*/
const popupCard_buttonNew = document.querySelector('#button_new');/*кнопка добавить в карточке*/
const popupCard_buttonAddClose = document.querySelector('#button_add_close');/*кнопка закрытия попапа карточек*/

const like = document.querySelector('.card__like');

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



function buttonClick(button, namePopup, add) /*функция открывает форму при нажатии на кнопку*/ {
  button.addEventListener('click', function() {
    namePopup.classList.toggle(add);
     /* условие: если попап закрыли без сохранения то значения 
     в попапе должны быть как в заголовке */
    if (button === popupProfile_buttonEditClose) {
      popupProfile_nameTitle.value = profile_name.textContent;
      popupProfile_description.value = profile_description.textContent;
    } else if (button === popupCard_buttonAddClose) {
      popupCard_nameTitle.value = '';
      popupCard_description.value = '';
    }
  });
}


function Inner()/*ф-ия изменения имени и описания*/ {
  profile_name.textContent = popupProfile_nameTitle.value;
  profile_description.textContent = popupProfile_description.value;
  popupProfile.classList.toggle('popup_opened');
}

function newCard (name, link) /* функция создания карточки */ {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardImg = document.createElement('img');
  cardImg.classList.add('card__img');
  cardImg.setAttribute('alt', name);
  cardImg.setAttribute('src', link);

  const cardNameCity = document.createElement('div');
  cardNameCity.classList.add('card__name-city');

  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card__title');
  cardTitle.textContent = name;

  const cardLike = document.createElement('button');
  cardLike.classList.add('card__like');
  cardImg.setAttribute('aria-label', 'Кнопка поставить лайк');

  const deleteCard = document.createElement('button');
  deleteCard.classList.add('card__delete');
  deleteCard.setAttribute('aria-label', 'Удалить карточку');

  cardNameCity.append(cardTitle, cardLike);
  card.append(deleteCard, cardImg, cardNameCity);
  cards.prepend(card);

  buttonClick(cardLike, cardLike, 'card__like_active');
  deleteCard.addEventListener('click', function() {
    card.remove();
  });
}

buttonClick(popupProfile_buttonEdit, popupProfile, 'popup_opened');
buttonClick(popupProfile_buttonEditClose, popupProfile, 'popup_opened');
buttonClick(popupCard_buttonAdd, popupCard, 'popup_opened');
buttonClick(popupCard_buttonAddClose, popupCard, 'popup_opened');


popupProfile_buttonSave.addEventListener('click', Inner);

popupCard_buttonNew.addEventListener('click', function() {
  newCard(popupCard_nameTitle.value, popupCard_description.value);
  popupCard_nameTitle.value = '';
  popupCard_description.value = '';
  popupCard.classList.toggle('popup_opened');
});

for (let i = 0; i < initialCards.length; i++)/* цикл загружает 6 карточек */ { 
  newCard(initialCards[i]['name'], initialCards[i]['link']);
}

function likeIs() {
  like.classList.toggle('card__like_active')
}

