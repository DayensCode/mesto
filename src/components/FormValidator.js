export class FormValidator {
	constructor(config, formElement) {
		this._form = formElement;
		this._inputSelector = config.inputSelector;
		this._submitButtonSelector = config.submitButtonSelector;
		this._inactiveButtonClass = config.inactiveButtonClass;
		this._inputErrorClass = config.inputErrorClass;
		this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
		this._button = this._form.querySelector(this._submitButtonSelector);
	}
	_showInputError(input, validationMessage) {
		const error = this._form.querySelector(`#${input.id}-error`);
		input.classList.add(this._inputErrorClass);
		error.textContent = validationMessage;
	}
	_hideInputError(input) {
		const error = this._form.querySelector(`#${input.id}-error`);
		input.classList.remove(this._inputErrorClass);
		error.textContent = '';
	}
	_isValid(input) {
		if(!input.validity.valid) {
			//если введено некорректное значение покажем ошибку
			this._showInputError(input, input.validationMessage);
		} else {
			this._hideInputError(input);
		}
	}
	_hasInvalidInput() {
		return this._inputs.some((input) => {
			return !input.validity.valid;
		});
	}
	_toggleSaveButton() {
		if(this._hasInvalidInput()) {
			//пусть кнопка будет неактивна
			this._button.classList.add(this._inactiveButtonClass);
			this._button.disabled = true;
		} else {
			//иначе на кнопку можно нажать
			this._button.classList.remove(this._inactiveButtonClass);
			this._button.disabled = false;
		}
	}
	_setEventListeners = () => {
		this._toggleSaveButton();
		this._inputs.forEach((input) => {
			input.addEventListener('input', () => {
				this._isValid(input);
				this._toggleSaveButton();
			});
		});
	}
	resetValidation() {
		this._toggleSaveButton(); //управляем кнопкой
		this._inputs.forEach((input) => {
			this._hideInputError(input) //очищаем ошибки
		});
	}
	enableValidation() {
		this._setEventListeners();
	}
}