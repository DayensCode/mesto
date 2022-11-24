console.log('Проверка');

const popupElement = document.querySelector('.popup');
console.log(popupElement);

const popupOpenButtonElement = document.querySelector('.profile__edit-button');
console.log(popupOpenButtonElement);

const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
console.log(popupCloseButtonElement);

let formElement = popupElement.querySelector('.popup__form');

let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_info');

let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle');

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
