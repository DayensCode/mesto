import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
	constructor(popupSelector, handleSubmit) {
		super(popupSelector);
		this._handleSubmit = handleSubmit;
		this._form = this._popup.querySelector('.popup__form');
		this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
	}
	//Cобираем данные всех полей формы
	_getInputValues() {
		const inputValues = {};// Создали пустой объект
		//Добавили в него значение каждого инпута
		this._inputs.forEach((input) => {
			inputValues[input.name] = input.value
		});
		return inputValues;
	}
	//Перезпись родительского метода
	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._handleSubmit(this._getInputValues());
		})
	}
	//Перезпись родительского метода
	closePopup() {
		super.closePopup();
		this._form.reset();
	}
}