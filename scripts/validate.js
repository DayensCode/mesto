//Отображение ошибки
const checkInputValidity = (input, rest) => {
	const error = document.querySelector(`#${input.id}-error`); //Находим элемент ошибки
	if (input.validity.valid) {
		//Не отображать ошибку
		error.textContent='';
		input.classList.remove(rest.inputErrorClass);
	} else {
		//Отобразить ошибку
		error.textContent=input.validationMessage;
		input.classList.add(rest.inputErrorClass);
	}
}

//Смена состояния кнопки отправки-сохранения
const toggleSaveButton = (inputs, button, rest) => {
	const isFormValid = inputs.every( input => input.validity.valid);
	if (isFormValid) {
		//Активная
		button.classList.remove(rest.inactiveButtonClass);
		button.disabled = false;
	} else {
		//Неактивная
		button.classList.add(rest.inactiveButtonClass);
		button.disabled = true;
	}
}

//Функция включения валидации
const enableValidation = (config) => {
	const {formSelector, inputSelector, submitButtonSelector, ...rest} = config;
	const forms = [...document.querySelectorAll(config.formSelector)];

	forms.forEach(form => {
		const inputs = [...form.querySelectorAll(config.inputSelector)];
		const button = form.querySelector(config.submitButtonSelector);

	inputs.forEach(input => {
	input.addEventListener('input', () => {
		checkInputValidity(input, rest);
		toggleSaveButton(inputs, button, rest);
		});
	});
});
}

//Вызов
enableValidation({
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__save-button',
	inactiveButtonClass: 'popup__save-button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible'
	}); 