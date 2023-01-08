export class Card {
	constructor(dataCard, templateSelector, openPopup, popupViewElement, popupPhoto, popupDescription) {
		this._name = dataCard.name;
		this._link = dataCard.link;
		this._templateSelector = templateSelector;
		this._openPopup = openPopup;
		this._popupViewElement = popupViewElement;
		this._popupPhoto = popupPhoto;
		this._popupDescription = popupDescription;
	}

	_getTemplate() {
		const cardElement = document
		.querySelector(this._templateSelector)
		.content.querySelector('.element')
		.cloneNode(true);

		return cardElement;
	}

	generateCard() {
		this._element = this._getTemplate();
		this._elementPhoto = this._element.querySelector('.element__photo');
		this._elementTitle = this._element.querySelector('.element__title');
		const like = this._element.querySelector('.element__like');
      const trash = this._element.querySelector('.element__trash');


		this._setEventListenerClickForPhoto();
		this._setEventListenerClickForLike(like);
		this._setEventListenerClickForTrash(trash);

		this._elementPhoto.src = this._link;
		this._elementPhoto.alt = this._name;
		this._elementTitle.textContent = this._name;

		return this._element;
	}

	_setEventListenerClickForPhoto() {
		this._elementPhoto.addEventListener('click', () => {
			this._handleOpenPopup();
		});
	}

	_setEventListenerClickForLike(like) {
		like.addEventListener('click', () => {
			this._handleLikeCard(like);
		});
	}

	_setEventListenerClickForTrash(trash) {
		trash.addEventListener('click', () => {
			this._handleDeleteCard(trash);
		});
	}

	_handleDeleteCard() {
		this._element.remove();
	}

	_handleLikeCard(like) {
		like.classList.toggle('element__like_active');
	}

	_handleOpenPopup() {
		this._popupPhoto.src = this._link;
		this._popupPhoto.alt = this._name;
		this._popupDescription.textContent = this._name;
		this._popupViewElement.classList.add('popup_opened');
	}

	_handleClosePopup() {
		this._popupPhoto.src = '';
		this._popupPhoto.alt = '';
		this._popupDescription.textContent = '';
		this._popupViewElement.classList.remove('popup_opened');
	}
}