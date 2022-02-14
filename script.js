const page = document.querySelector('.page');

const popupProfile_buttonEdit = document.querySelector('.profile__edit-button');/*кнопка редкатирования профиля*/
const popupProfile = document.querySelector('.popup');/*блок формы редктирования профиля*/
const buttonEditClose = document.querySelector('.popup__img');/*кнопка закрытия попа*/
const profile_name = document.querySelector('.profile__title');/*имя профиля*/
const profile_description = document.querySelector('.profile__subtitle');/*описание профиля*/
const popupProfile_buttonSave = document.querySelector('.popup__text-button');/*кнопка сохранить*/

const popupProfile_nameTitle = document.querySelector('#name');/*имя в форме профайла*/
const popupProfile_description = document.querySelector('#subtitle');/*описание в форме профайла*/

const popupCard_nameTitle = document.querySelector('#name_card');/*имя в форме карточки*/
const popupCard_description = document.querySelector('#subtitle_card');/*описание в форме карточки*/

const cards = document.querySelector('.cards');/*карточки*/
const popupCard_buttonAdd = document.querySelector('.profile__add-button');/*кнопка добавить попап карточки*/
const popupCard = document.querySelector('#popup_add_card');/*попап добавления карточек*/
const popupCard_buttonNew = document.querySelector('#button_new');/*кнопка добавить в карточке*/
const buttonAddClose = document.querySelector('#popup__img');/*кнопка закрытия попапа карточек*/

const img = document.querySelector('.card-img');//блок с расширенной картинкой
const elementImg = document.querySelector('.card-img__image');//место ссылки картинки
const elementName = document.querySelector('.card-img__subtitle');//место имени картинки
const closeBtn = document.querySelector('#close-img');//кнопка закрытия картинки

const like = document.querySelector('.card__like');//Лайк в карточке

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

// ****************************************
// Функции
// ************

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

/*ф-ия изменения имени и описания*/
function Inner() {
  profile_name.textContent = popupProfile_nameTitle.value;
  profile_description.textContent = popupProfile_description.value;
  popupProfile.classList.toggle('popup_opened');
}

/* функция создания карточки */ 
function newCard (name, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__img').setAttribute('alt', name);
  cardElement.querySelector('.card__img').setAttribute('src', link)
  cardElement.querySelector('.card__img').setAttribute('aria-label', name);
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__like').setAttribute('aria-label', 'Кнопка поставить лайк');
  cardElement.querySelector('.card__delete').setAttribute('aria-label', 'Удалить карточку');

  cards.prepend(cardElement);
  
  //ставит лайк
  cardElement.querySelector('.card__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like_active');
  })
  // удаляет карточку
  cardElement.querySelector('.card__delete').addEventListener('click', function() {
    cardElement.remove();
  })

  // При нажатии на картинку в карточке открывает ее полное изображение
  cardElement.querySelector('.card__img').addEventListener('click', function() {
    openPopup(img);
    addImg(name, link)
  })
  //кнопка закрытия окна с картинкой
  closeBtn.addEventListener('click', function() {
    closePopup(img);
  })
}
//функция добавляет адрес ссылки картинки и название в расширенную картинку
function addImg(name, link) {
  elementImg.setAttribute('alt', name);
  elementImg.setAttribute('src', link);

  elementName.textContent = name
}

// ****************************************
// Тело программы
// ************

// кнопка создает новую карточку при нажатии
popupCard_buttonNew.addEventListener('click', function() {
  newCard(popupCard_nameTitle.value, popupCard_description.value);
  popupCard_nameTitle.value = '';
  popupCard_description.value = '';
  popupCard.classList.toggle('popup_opened');
});

popupProfile_buttonEdit.addEventListener('click', function() {
  openPopup(popupProfile);
})

buttonEditClose.addEventListener('click', function() {
  closePopup(popupProfile);
  popupProfile_nameTitle.value = profile_name.textContent;
  popupProfile_description.value = profile_description.textContent;
})

popupCard_buttonAdd.addEventListener('click', function() {
  openPopup(popupCard);
})

buttonAddClose.addEventListener('click', function() {
  closePopup(popupCard);
  popupCard_nameTitle.value = '';
  popupCard_description.value = '';
})

popupProfile_buttonSave.addEventListener('click', Inner);

/* цикл загружает 6 карточек */
initialCards.forEach(function (item) {
  newCard(item['name'], item['link']);
})
