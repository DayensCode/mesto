const popupElement = document.querySelector('.popup');

const popupOpenButtonElement = document.querySelector('.profile__edit-button');

const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');

const formElement = popupElement.querySelector('.popup__form');

const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_info');

const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

const openPopup = function() {
	popupElement.classList.add('popup_opened');
	nameInput.value=nameProfile.textContent;
	jobInput.value=jobProfile.textContent;
}

const closePopup = function() {
	popupElement.classList.remove('popup_opened');
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
	evt.preventDefault();
	nameProfile.textContent=nameInput.value;
	jobProfile.textContent=jobInput.value;
	closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
