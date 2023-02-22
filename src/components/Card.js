export class Card {
	constructor(userId, dataCard, templateSelector, {handleCardClick}, {handleLikeClick}, {handleDeleteClick}) {
		this._userId = userId;
		this._name = dataCard.name;
		this._link = dataCard.link;
		this._cardId = dataCard._id;
		this._likesLength = dataCard.likes.length;
		this._likes = dataCard.likes;
		this._ownerId = dataCard.owner._id;
		this._templateSelector = templateSelector;
		this._handleCardClick = handleCardClick;
		this._handleLikeClick = handleLikeClick;
		this._handleDeleteClick = handleDeleteClick;
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
		this._like = this._element.querySelector('.element__like'); 
		this._trash = this._element.querySelector('.element__trash');
		this._counter = this._element.querySelector('.element__counter');

		//сравниваем айди, если не совпадают, то удаляем корзинку
		if (this._userId !== this._ownerId) {
			this._trash.remove();
		}
		this.updateCounter(this._likes);

		//навешиваем обработчик событий
		this._setEventListeners();

		this._counter.textContent = this._likesLength;
		this._elementPhoto.src = this._link;
		this._elementPhoto.alt = this._name;
		this._elementTitle.textContent = this._name;

		return this._element;
	}

	_setEventListeners() {
		this._elementPhoto.addEventListener('click', () => {
			this._handleCardClick(this._name, this._link);
		});
		this._like.addEventListener('click', () => {
			this._handleLikeClick(this._cardId);
		});
		this._trash.addEventListener('click', () => {
			this._handleDeleteClick();
		});
	}

	handleDeleteCard() {
		this._element.remove();
	}

	hasMyLike() {
		return this._likes.some((like) => like._id === this._userId);
	}


	toggleLike() {
		if (this.hasMyLike()) {
			this._like.classList.add('element__like_active');
		} else {
			this._like.classList.remove('element__like_active');
		}
	}

	//пишем колличество лайков в каунтер
	updateCounter(likesList) {
		this._likes = likesList;
		this._counter.textContent = this._likes.length;
		this.toggleLike();
	}

}