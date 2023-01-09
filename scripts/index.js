//Импорты
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards, config} from './constants.js';

// Дом узлы
const elementsContainer = document.querySelector('.elements');

const popupEditElement = document.querySelector('.popup_edit');
const popupAddElement = document.querySelector('.popup_add');
const popupViewElement = document.querySelector('.popup_view');

const popupPhoto = document.querySelector('.popup__photo');
const popupDescription = document.querySelector('.popup__description');

const popupOpenEditButtonElement = document.querySelector('.profile__edit-button');
const popupOpenAddButtonElement = document.querySelector('.profile__add-button');

const buttonCloseList = document.querySelectorAll('.popup__close-button');

const formEditElement = document.querySelector('.popup__form_edit');
const formAddElement = document.querySelector('.popup__form_add');

const nameInput = formEditElement.querySelector('.popup__input_type_name');
const jobInput = formEditElement.querySelector('.popup__input_type_info');
const mestoTitleInput = formAddElement.querySelector('.popup__input_type_mesto-title');
const mestoLinkInput = formAddElement.querySelector('.popup__input_type_mesto-link');

const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

// Функци открытия-закрытия попапов
function openPopup(element) {
	element.classList.add('popup_opened');
	element.addEventListener('mousedown', closePopupByOverlay);
	document.addEventListener('keydown', closePopupByEsc);
};

function handleCardClick(dataCard) {
	popupPhoto.src = dataCard.link;
	popupPhoto.alt = dataCard.name;
	popupDescription.textContent = dataCard.name;
	openPopup(popupViewElement);
}

function closePopup (element) {
	element.classList.remove('popup_opened');
	element.removeEventListener('mousedown', closePopupByOverlay);
	document.removeEventListener('keydown', closePopupByEsc);
}

buttonCloseList.forEach(btn => {
	const popup = btn.closest('.popup');
	btn.addEventListener('click', () => closePopup(popup)); 
	})


//По оверлэю
function closePopupByOverlay(e) {
	if (e.target.classList.contains('popup_opened'))
	closePopup(e.target);
}

//По Esc
function closePopupByEsc(e) {
	if (e.key === 'Escape') {
	closePopup(document.querySelector('.popup_opened'));
	}
}

// Навесили слушатели клика по кнопкам открытия-закрыия попапов
popupOpenEditButtonElement.addEventListener('click', (evt) => {
	openPopup(popupEditElement);
	nameInput.value=nameProfile.textContent;
	jobInput.value=jobProfile.textContent;
});

popupOpenAddButtonElement.addEventListener('click', (evt) => {
	openPopup(popupAddElement);
	formValidatorForAdd.resetValidation();
});


// Функции отправки-сохранения введенных значений
function handleEditFormSubmit (evt) {
	evt.preventDefault();
	nameProfile.textContent=nameInput.value;
	jobProfile.textContent=jobInput.value;
	closePopup(popupEditElement);
}

function handleAddFormSubmit (evt) {
	evt.preventDefault();
	renderCard({	name: mestoTitleInput.value, 
						link: mestoLinkInput.value })
	formAddElement.reset();
	closePopup(popupAddElement);
};

// Навесили слушатели отправки-сохранения на форму
formEditElement.addEventListener('submit', handleEditFormSubmit);
formAddElement.addEventListener('submit', handleAddFormSubmit);

// Отрисовка карточек
const renderCard = (dataCard) => {
	elementsContainer.prepend(createCard(dataCard));
};

function createCard(dataCard) {
	const card = new Card(dataCard, '#element-template', openPopup, popupViewElement, popupPhoto, popupDescription);
	const cardElement = card.generateCard();
	return cardElement
}

// Проходимся по массиву
initialCards.forEach((dataCard) => {
	const card = new Card(dataCard, '#element-template', handleCardClick, popupViewElement, popupPhoto, popupDescription);
	const cardElement = card.generateCard();

	elementsContainer.prepend(cardElement);
});

const formValidatorForEdit = new FormValidator(config, formEditElement);
formValidatorForEdit.enableValidation(); //Вызов валидации

const formValidatorForAdd = new FormValidator(config, formAddElement);
formValidatorForAdd.enableValidation(); //Вызов валидации