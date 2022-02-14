const page = document.querySelector('.page');

const popupProfile_buttonEdit = document.querySelector('.profile__edit-button');/*кнопка редкатирования профиля*/
const popupProfile = document.querySelector('.popup');/*блок формы редктирования профиля*/
const popupProfile_buttonEditClose = document.querySelector('.popup__img');/*кнопка закрытия профиля*/
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
const popupCard_buttonAddClose = document.querySelector('#button_add_close');/*кнопка закрытия попапа карточек*/

const img = document.querySelector('.card-img');//блок с расширенной картинкой
const elementImg = document.querySelector('.card-img__image');//место ссылки картинки
const elementName = document.querySelector('.card-img__subtitle');//место имени картинки
const closeBtn = document.querySelector('.card-img__button');//кнопка закрытия картинки

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

 /*функция открывает форму при нажатии на кнопку*/
function buttonClick(button, namePopup, add) {
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
    img.classList.add('card-img_opened');
    addImg(name, link)
  })
  //кнопка закрытия окна с картинкой
  closeBtn.addEventListener('click', function() {
    img.classList.remove('card-img_opened');
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

buttonClick(popupProfile_buttonEdit, popupProfile, 'popup_opened');
buttonClick(popupProfile_buttonEditClose, popupProfile, 'popup_opened');

popupProfile_buttonSave.addEventListener('click', Inner);

buttonClick(popupCard_buttonAdd, popupCard, 'popup_opened');
buttonClick(popupCard_buttonAddClose, popupCard, 'popup_opened');


/* цикл загружает 6 карточек */
initialCards.forEach(function (item) {
  newCard(item['name'], item['link']);
})
