import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
	constructor(popupSelector, popupPhoto, popupDescription) {
		super(popupSelector);
		this._popupPhoto = popupPhoto;
		this._popupDescription = popupDescription;
	}
	//Перезапись родительского метода
	openPopup(popupPhoto, popupDescription) {
		super.openPopup();
		this._popupPhoto.src = popupPhoto;
		this._popupPhoto.alt = popupDescription;
		this._popupDescription.textContent = popupDescription;
	}
}