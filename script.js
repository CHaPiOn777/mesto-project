const page = document.querySelector('.page');

const popupProfile_buttonEdit = document.querySelector('.profile__edit-button');/*кнопка редкатирования профиля*/

const popupCard = document.querySelector('.popup__card');/*блок формы редктирования профиля*/
const popupProfile = document.querySelector('.popup__profile');/*блок формы редктирования карточки*/
const popupImg = document.querySelector('.card-img');/*блок формы редктирования картинки*/

const buttonsClose = document.querySelectorAll('.popup__img');/*кнопки закрытия попа*/
const profileName = document.querySelector('.profile__title');/*имя профиля*/
const profileDescription = document.querySelector('.profile__subtitle');/*описание профиля*/
const popupProfileButtonSave = document.querySelector('#asdd');/*кнопка сохранить*/

const popupProfileNameTitle = document.querySelector('#name');/*имя в форме профайла*/
const popupProfileDescription = document.querySelector('#subtitle');/*описание в форме профайла*/

const popupCardNameTitle = document.querySelector('#name_card');/*имя в форме карточки*/
const popupCardDescription = document.querySelector('#subtitle_card');/*описание в форме карточки*/

const cards = document.querySelector('.cards');/*карточки*/
const popupCardButtonAdd = document.querySelector('.profile__add-button');/*кнопка добавить попап карточки*/
const popupCardButtonNew = document.querySelector('#asd');/*кнопка добавить в карточке*/

const elementImg = document.querySelector('.card-img__image');//место ссылки картинки
const elementName = document.querySelector('.card-img__subtitle');//место имени картинки

const like = document.querySelector('.card__like');//Лайк в карточке

const cardTemplate = document.querySelector('#card-template').content;


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
function saveText(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileNameTitle.value;
  profileDescription.textContent = popupProfileDescription.value;
  closePopup(popupProfile)
}

//функция создания карточки
function submitFormHandler (evt) {
  evt.preventDefault();
  cards.prepend(newCard(popupCardNameTitle.value, popupCardDescription.value));
  popupCardNameTitle.value = '';
  popupCardDescription.value = '';
  closePopup(popupCard)
}

/* функция создания карточки */ 
function newCard (name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__img').setAttribute('alt', name);
  cardElement.querySelector('.card__img').setAttribute('src', link)
  cardElement.querySelector('.card__img').setAttribute('aria-label', name);
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__like').setAttribute('aria-label', 'Кнопка поставить лайк');
  cardElement.querySelector('.card__delete').setAttribute('aria-label', 'Удалить карточку');
  
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
    openPopup(popupImg);
    addImg(name, link)
  })
  return cardElement
}
//функция добавляет адрес ссылки картинки и название в расширенную картинку
function addImg(name, link) {
  elementImg.setAttribute('src', link);
  elementImg.setAttribute('alt', name);

  elementName.textContent = name
}

// ****************************************
// Тело программы
// ************

popupCardButtonNew.addEventListener('submit', submitFormHandler); 


//открывает попап профиля
popupProfile_buttonEdit.addEventListener('click', function() {
  openPopup(popupProfile);
  popupProfileNameTitle.value = profileName.textContent;
  popupProfileDescription.value = profileDescription.textContent;
})

//открывает попап карточек
popupCardButtonAdd.addEventListener('click', function() {
  openPopup(popupCard);
  popupCardNameTitle.value = '';
  popupCardDescription.value = '';
})

//кнопка закрытия
buttonsClose.forEach(function(del) {
  del.addEventListener('click', function(){
      closePopup(popupCard);
      closePopup(popupProfile);
      closePopup(popupImg);
    })
})

//сохраняет введенные данные в попап профиля
popupProfileButtonSave.addEventListener('submit', saveText);

/* цикл загружает 6 карточек */
initialCards.forEach(function (item) {
  cards.append(newCard(item['name'], item['link']));
})
