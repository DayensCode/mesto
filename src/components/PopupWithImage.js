import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._popupPhoto = this._popup.querySelector('.popup__photo');
		this._popupDescription = this._popup.querySelector('.popup__description');
	}
	
	//Перезапись родительского метода
	openPopup(popupPhoto, popupDescription) {
		super.openPopup();
		this._popupPhoto.src = popupPhoto;
		this._popupPhoto.alt = popupDescription;
		this._popupDescription.textContent = popupDescription;
	}
}