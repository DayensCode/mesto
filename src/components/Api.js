export class Api {
	constructor({
		baseUrl,
		headers
	}) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}
	_checkResponse(res) {
		if(res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка ${res.status}`);
	}
	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: this._headers
		}).then(this._checkResponse);
	}
	getInitialCards() {
		return fetch(`${this._baseUrl}/cards`, {
			headers: this._headers
		}).then(this._checkResponse);
	}
	updateUserInfo(name, about) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({
				name: name,
				about: about,
			}),
		}).then(this._checkResponse);
	}
	updateAvatar(avatar) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({
				avatar: avatar,
			}),
		}).then(this._checkResponse);
	}
	addCard(values) {
		return fetch(`${this._baseUrl}/cards`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify({
				name: values.name,
				link: values.link,
			}),
		}).then(this._checkResponse);
	}
	deleteCard(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}`, {
			method: "DELETE",
			headers: this._headers,
		}).then(this._checkResponse);
	}
	addLike(id) {
		return fetch(`${this._baseUrl}/cards/${id}/likes`, {
			method: "PUT",
			headers: this._headers,
		}).then(this._checkResponse);
	}
	deleteLike(id) {
		return fetch(`${this._baseUrl}/cards/${id}/likes`, {
			method: "DELETE",
			headers: this._headers,
		}).then(this._checkResponse);
	}
}