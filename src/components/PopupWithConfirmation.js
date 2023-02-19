import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
	constructor(PopupWithConfirmationSelector) {
		super(PopupWithConfirmationSelector);
		this._form = this._popup.querySelector('.popup__form');
	}

	setSubmit (callback) {
		this._confirmSubmit = callback;
	}

	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._confirmSubmit();
		})
	}
}