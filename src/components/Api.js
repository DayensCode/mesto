export class Api {
	constructor({baseUrl, headers}) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
			.then(res => res.json())
			.catch(res => console.log(`Ошибка: ${res.status}`));
	}

	getInitialCards() {
		return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
			.then(res => res.json())
			.catch(res => console.log(`Ошибка: ${res.status}`));
	}

	updateUserInfo(name, about) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: {
				authorization: '33af4097-04f9-4bd1-a567-06d34ef10bd4',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
			name: name,
			about: about
			})
		})
		.then(res => res.json())
	}

	updateAvatar(avatar) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: {
				authorization: '33af4097-04f9-4bd1-a567-06d34ef10bd4',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
			avatar: avatar,
			})
		})
		.then(res => res.json())
	}

	addCard(values) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: {
				authorization: '33af4097-04f9-4bd1-a567-06d34ef10bd4',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
			name: values.name,
			link: values.link
			})
		})
		.then(res => res.json())
	}

	deleteCard(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}`, {
			method: 'DELETE',
			headers: {
				authorization: '33af4097-04f9-4bd1-a567-06d34ef10bd4',
				'Content-Type': 'application/json'
			}
			})
		.then(res => {
			if(res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка: ${res.status}`)
		})
	}

	addLike(cardId){
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: 'PUT',
			headers: {
				authorization: '33af4097-04f9-4bd1-a567-06d34ef10bd4',
				'Content-Type': 'application/json'
			}
		})
		.then(res => {
			if(res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка: ${res.status}`)
		})
	}

	deleteLike(cardId){
			return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: 'DELETE',
			headers: {
				authorization: '33af4097-04f9-4bd1-a567-06d34ef10bd4',
				'Content-Type': 'application/json'
			}
		})
		.then(res => {
			if(res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка: ${res.status}`)
		})
	}
}
