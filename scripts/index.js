// Дом узлы
const elementsContainer = document.querySelector('.elements');

const popupElement = document.querySelector('.popup_edit');
const popupAddElement = document.querySelector('.popup_add');

const popupOpenEditButtonElement = document.querySelector('.profile__edit-button');
const popupOpenAddButtonElement = document.querySelector('.profile__add-button');

const popupCloseButtonElement = popupElement.querySelector('.popup__close-button-for-edit');
const popupCloseAddButtonElement = popupAddElement.querySelector('.popup__close-button-for-add');

const formEditElement = popupElement.querySelector('.popup__form_edit');
const formAddElement = popupAddElement.querySelector('.popup__form_add');

const nameInput = formEditElement.querySelector('.popup__input_type_name');
const jobInput = formEditElement.querySelector('.popup__input_type_info');
const mestoTitleInput = formAddElement.querySelector('.popup__input_type_mesto-title');
const mestoLinkInput = formAddElement.querySelector('.popup__input_type_mesto-link');

const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

// Функции открытия-закрытия попапов
const openEditPopup = function() {
	popupElement.classList.add('popup_opened');
	nameInput.value=nameProfile.textContent;
	jobInput.value=jobProfile.textContent;
}

const openAddPopup = function() {
	popupAddElement.classList.add('popup_opened');
}

const closePopup = function() {
	popupElement.classList.remove('popup_opened');
}

const closeAddPopup = function() {
	popupAddElement.classList.remove('popup_opened');
}


// Навесили слушатели клика по кнопкам открытия-закрыия попапов
popupOpenEditButtonElement.addEventListener('click', openEditPopup);
popupOpenAddButtonElement.addEventListener('click', openAddPopup);

popupCloseButtonElement.addEventListener('click', closePopup);
popupCloseAddButtonElement.addEventListener('click', closeAddPopup);


// Функции отправки-сохранения введенных значений
function formSubmitHandler (evt) {
	evt.preventDefault();
	nameProfile.textContent=nameInput.value;
	jobProfile.textContent=jobInput.value;
	closePopup();
}

function addFormSubmitHandler (evt) {
	evt.preventDefault();
	renderCard({	name: mestoTitleInput.value, 
						link: mestoLinkInput.value })
	mestoTitleInput.value = '';
	mestoLinkInput.value = '';
	closeAddPopup();
};

// Навесили слушатели отправки-сохранения на форму
formEditElement.addEventListener('submit', formSubmitHandler);
formAddElement.addEventListener('submit', addFormSubmitHandler);

// Получаем тимплейт
const cardTemplate = document.querySelector('#element-template').content.querySelector('.element');

// Функция удаления карточки
const handlerDeleteCard = (event) => {
	event.target.closest('.element').remove();
}

// Генерация карточки
const generateCard = (dataCard) => {
	const newCard = cardTemplate.cloneNode(true);
	const like = newCard.querySelector('.element__like');
	const likeHandler = function() {
		like.classList.add('element__like_active');
	}
	const trash = newCard.querySelector('.element__trash');
   const title = newCard.querySelector('.element__title');
	const photo = newCard.querySelector('.element__photo');
	like.addEventListener('click', likeHandler);
	trash.addEventListener('click', handlerDeleteCard);
   title.textContent = dataCard.name;
	photo.src = dataCard.link;

	const popupPhoto = document.querySelector('.popup__photo');
	const popupDescription = document.querySelector('.popup__description');
	const popupCloseViewButtonElement = document.querySelector('.popup__close-button-for-view');
	const popupViewElement = document.querySelector('.popup_view');
	const openViewPopup = function() {
		popupViewElement.classList.add('popup_opened');
		popupPhoto.src = dataCard.link;
		popupDescription.textContent = dataCard.name;
	}
	const closeViewPopup = function() {
		popupViewElement.classList.remove('popup_opened');
	}
	photo.addEventListener('click', openViewPopup);
	popupCloseViewButtonElement.addEventListener('click', closeViewPopup);
   return newCard;
}

const giveLike = function() {
   likeButtonElement.classList.add('element__like_active');
}


// Отрисовка карточек
const renderCard = (dataCard) => {
	elementsContainer.prepend(generateCard(dataCard));
};

// Проходимся по массиву
initialCards.forEach((dataCard) => {
	renderCard(dataCard);
});
