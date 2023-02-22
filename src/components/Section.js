export class Section {
	constructor({
			items, renderer
		}, selector) {
			this._renderer = renderer;
			this._container = document.querySelector(selector);
		}
		//Отрисовка всех элементов
	renderItems(items) {
			items.reverse();
			items.forEach((item) => {
				this._renderer(item);
			});
		}
		//Принимает DOM-элемент и добавляет его в контейнер
	addItem(cardElement) {
		this._container.prepend(cardElement);
	}
}