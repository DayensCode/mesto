import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards, config } from '../components/constants.js';

import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

import './index.css';

const popupPhoto = document.querySelector('.popup__photo');
const popupDescription = document.querySelector('.popup__description');

const popupOpenEditButtonElement = document.querySelector('.profile__edit-button');
const popupOpenAddButtonElement = document.querySelector('.profile__add-button');

const formEditElement = document.querySelector('.popup__form_edit');
const formAddElement = document.querySelector('.popup__form_add');

const nameInput = formEditElement.querySelector('.popup__input_type_name');
const jobInput = formEditElement.querySelector('.popup__input_type_info');


popupOpenEditButtonElement.addEventListener('click', () => {
	modalEdit.openPopup();
	const information = user.getUserInfo();
	nameInput.value = information.name;
	jobInput.value = information.info;
});
popupOpenAddButtonElement.addEventListener('click', () => {
	modalAdd.openPopup();
	formValidatorForAdd.resetValidation();
});

function createCard(dataCard) {
	const card = new Card(dataCard, '#element-template', (name,link) => {
		modalView.openPopup();
		popupPhoto.src = link;
		popupPhoto.alt = name;
		popupDescription.textContent = name;
	});

	const cardElement = card.generateCard();
	return cardElement;
}

const formValidatorForEdit = new FormValidator(config, formEditElement);
formValidatorForEdit.enableValidation();

const formValidatorForAdd = new FormValidator(config, formAddElement);
formValidatorForAdd.enableValidation();

const cardList = new Section( {
initialCards: initialCards,
	renderer: (item) => {
		const card = createCard(item)
		cardList.addItem(card);
	}, }, '.elements');

	cardList.renderItems();


	const modalEdit = new PopupWithForm('.popup_edit', (data) => {
		user.setUserInfo(data);
		modalEdit.closePopup();
	});
	modalEdit.setEventListeners();

	const modalAdd = new PopupWithForm('.popup_add', (data) => {
		cardList.addItem(createCard(data));
		modalAdd.closePopup();
	});
	modalAdd.setEventListeners();

	const modalView = new PopupWithImage('.popup_view');
	modalView.setEventListeners();

	const user = new UserInfo({name: '.profile__title', info: '.profile__subtitle'});

	//Сергей, доброго времени!
	//Исправила критические замечания, но, к сожалению,
	//не могу запустить у себя dev сборку, чтобы все проверить.
	//Терминал выдает следующее сообщение:
	//npm ERR! Missing script: "dev"
	//npm ERR!
	//npm ERR! To see a list of scripts, run:
	//npm ERR!   npm run

	//npm ERR! A complete log of this run can be found in:
	//npm ERR!     C:\Users\Alexandr\AppData\Local\npm-cache\_logs\2023-02-05T14_23_43_256Z-debug-0.log


	//Подскажите, пожалуйста, как это поправить?
	//Благодарю за полезнейшее ревью :)