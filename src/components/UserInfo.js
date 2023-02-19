export class UserInfo {
	constructor({name, about}, avatar) {
	this._name = document.querySelector(name);
	this._about = document.querySelector(about);
	this._avatar = document.querySelector(avatar);
	}
	//Возвращаем объект с данными пользователя
	getUserInfo() {
		return {
			name: this._name.textContent,
			about: this._about.textContent
		}
	}
	//Принимаем новые данные пользователя и добавляем их на страницу
	setUserInfo(userData) {
		this._name.textContent = userData.name;
		this._about.textContent = userData.about;
	}

	setAvatar(link) {
	this._avatar.src = link;
	}
}