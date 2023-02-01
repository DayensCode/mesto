export class Section {
	constructor( {initialCards, renderer}, selector ) {
		this._initialCards = initialCards;
		this._renderer = renderer;
		this._container = document.querySelector(selector);
	}
	//Отрисовка всех элементов
	renderItems() {
		this._initialCards.forEach((item) => {
			this._renderer(item);
		});
	}
	//Принимает DOM-элемент и добавляет его в контейнер
	addItem(cardElement) {
		this._container.prepend(cardElement);
	}
}