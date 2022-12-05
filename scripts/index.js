// Дом узлы
const elementsContainer = document.querySelector('.elements');

const popupEditElement = document.querySelector('.popup_edit');
const popupAddElement = document.querySelector('.popup_add');
const popupViewElement = document.querySelector('.popup_view');

const popupPhoto = document.querySelector('.popup__photo');
const popupDescription = document.querySelector('.popup__description');

const popupOpenEditButtonElement = document.querySelector('.profile__edit-button');
const popupOpenAddButtonElement = document.querySelector('.profile__add-button');

const popupCloseEditButtonElement = popupEditElement.querySelector('.popup__close-button-for-edit');
const popupCloseAddButtonElement = popupAddElement.querySelector('.popup__close-button-for-add');
const popupCloseViewButtonElement = document.querySelector('.popup__close-button-for-view');

const formEditElement = popupEditElement.querySelector('.popup__form_edit');
const formAddElement = popupAddElement.querySelector('.popup__form_add');

const nameInput = formEditElement.querySelector('.popup__input_type_name');
const jobInput = formEditElement.querySelector('.popup__input_type_info');
const mestoTitleInput = formAddElement.querySelector('.popup__input_type_mesto-title');
const mestoLinkInput = formAddElement.querySelector('.popup__input_type_mesto-link');

const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

// Получаем тимплейт
const cardTemplate = document.querySelector('#element-template').content.querySelector('.element');

// Функции открытия-закрытия попапов
function openPopup(popup) {
	popup.classList.add('popup_opened');
}

const openEditPopup = function () {
	popupEditElement.classList.add('popup_opened');
	nameInput.value=nameProfile.textContent;
	jobInput.value=jobProfile.textContent;
}

const openAddPopup = function() {
	popupAddElement.classList.add('popup_opened');
}

const closePopup = function() {
	popupEditElement.classList.remove('popup_opened');
}

const closeAddPopup = function() {
	popupAddElement.classList.remove('popup_opened');
}


// Навесили слушатели клика по кнопкам открытия-закрыия попапов
popupOpenEditButtonElement.addEventListener('click', openEditPopup);
popupOpenAddButtonElement.addEventListener('click', openAddPopup);

popupCloseEditButtonElement.addEventListener('click', closePopup);
popupCloseAddButtonElement.addEventListener('click', closeAddPopup);


// Функции отправки-сохранения введенных значений
function handleEditFormSubmit (evt) {
	evt.preventDefault();
	nameProfile.textContent=nameInput.value;
	jobProfile.textContent=jobInput.value;
	closePopup();
}

function handleAddFormSubmit (evt) {
	evt.preventDefault();
	renderCard({	name: mestoTitleInput.value, 
						link: mestoLinkInput.value })
	mestoTitleInput.value = '';
	mestoLinkInput.value = '';
	closeAddPopup();
};

// Навесили слушатели отправки-сохранения на форму
formEditElement.addEventListener('submit', handleEditFormSubmit);
formAddElement.addEventListener('submit', handleAddFormSubmit);

// Функция удаления карточки
const handlerDeleteCard = (event) => {
	event.target.closest('.element').remove();
}

// Генерация карточки
const generateCard = (dataCard) => {
	const newCard = cardTemplate.cloneNode(true);
	const like = newCard.querySelector('.element__like');
	const likeHandler = function() {
		like.classList.toggle('element__like_active');
	}
	const trash = newCard.querySelector('.element__trash');
   const title = newCard.querySelector('.element__title');
	const photo = newCard.querySelector('.element__photo');

	like.addEventListener('click', likeHandler);
	trash.addEventListener('click', handlerDeleteCard);
   title.textContent = dataCard.name;
	photo.alt = dataCard.name;
	photo.src = dataCard.link;

	const openViewPopup = function() {
		popupViewElement.classList.add('popup_opened');
		popupPhoto.src = dataCard.link;
		popupPhoto.alt = dataCard.name;
		popupDescription.textContent = dataCard.name;
	}
	const closeViewPopup = function() {
		popupViewElement.classList.remove('popup_opened');
	}
	photo.addEventListener('click', openViewPopup);
	popupCloseViewButtonElement.addEventListener('click', closeViewPopup);
   return newCard;
}

// Отрисовка карточек
const renderCard = (dataCard) => {
	elementsContainer.prepend(generateCard(dataCard));
};

// Проходимся по массиву
initialCards.forEach((dataCard) => {
	renderCard(dataCard);
});
