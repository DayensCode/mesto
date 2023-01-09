export class Card {
	constructor(dataCard, templateSelector, handleCardClick, popupViewElement, popupPhoto, popupDescription) {
		this._name = dataCard.name;
		this._link = dataCard.link;
		this._templateSelector = templateSelector;
		this._handleCardClick = handleCardClick;
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
			this._handleCardClick(this._name, this._link)
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
}