import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { config } from "../utils/constants.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import "./index.css";
import { Api } from "../components/Api.js";
const popupOpenEditButtonElement = document.querySelector(
  ".profile__edit-button"
);
const popupOpenAddButtonElement = document.querySelector(
  ".profile__add-button"
);
const popupOpenChangeElement = document.querySelector(
  ".profile__change-button"
);
const formEditElement = document.forms["edit-info"];
const formAddElement = document.forms["add-mesto"];
const avatarForm = document.forms["change"];
const nameInput = formEditElement.querySelector(".popup__input_type_name");
const jobInput = formEditElement.querySelector(".popup__input_type_info");
const avatarInput = document.querySelector(".popup__input_type_avatar-link");
popupOpenEditButtonElement.addEventListener("click", () => {
  modalEdit.openPopup();
  const information = user.getUserInfo();
  nameInput.value = information.name;
  jobInput.value = information.about;
});
popupOpenAddButtonElement.addEventListener("click", () => {
  modalAdd.openPopup();
  formValidatorForAdd.resetValidation();
});
popupOpenChangeElement.addEventListener("click", () => {
  avatarPopup.openPopup();
  formValidatorForChange.resetValidation();
});
const user = new UserInfo({
  name: ".profile__title",
  about: ".profile__subtitle",
  avatar: ".profile__avatar",
});
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "480b5a02-860e-4e93-b3ff-2cb152b07e87",
    "Content-Type": "application/json",
  },
});
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([serverCards, userData]) => {
    user.setUserInfo(userData.name, userData.about);
    user.setAvatar(userData.avatar);
    userId = userData._id;
    cardList.renderItems(serverCards);
  })
  .catch((err) => console.log(`Ошибка: ${err.status}`));
const cardList = new Section(
  {
    items: [],
    renderer: (item) => {
      const card = createCard(item);
      cardList.addItem(card);
    },
  },
  ".elements"
);
let userId;

function createCard(dataCard) {
  const card = new Card(
    userId,
    dataCard,
    "#element-template",
    {
      handleCardClick: (name, link) => {
        modalView.openPopup(link, name);
      },
    },
    {
      handleLikeClick: (id) => {
        card.hasMyLike() //удалим если имеется наш
          ? api
              .deleteLike(id)
              .then((res) => {
                card.updateCounter(res.likes);
              })
              .catch((err) => console.log(err))
          : api
              .addLike(id) //добавим если нет нашего
              .then((res) => {
                card.updateCounter(res.likes);
              })
              .catch((err) => console.log(err));
      },
    },
    {
      handleDeleteClick: () => {
        modalConfirm.openPopup();
        modalConfirm.setSubmit(() => {
          api
            .deleteCard(dataCard._id)
            .then(() => {
              card.handleDeleteCard();
              modalConfirm.closePopup();
            })
            .catch((err) => console.log(err));
        });
      },
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
}
const formValidatorForEdit = new FormValidator(config, formEditElement);
formValidatorForEdit.enableValidation();
const formValidatorForAdd = new FormValidator(config, formAddElement);
formValidatorForAdd.enableValidation();
const formValidatorForChange = new FormValidator(config, avatarForm);
formValidatorForChange.enableValidation();
const modalEdit = new PopupWithForm(".popup_edit", (data) => {
  modalEdit.changeButtonText("Сохранение...");
  api
    .updateUserInfo(data.name, data.about)
    .then((res) => user.setUserInfo(res.name, res.about))
    .then(() => modalEdit.closePopup())
    .catch((err) => console.log(err))
    .finally(() => modalEdit.changeButtonText("Сохранить"));
});
modalEdit.setEventListeners();
const modalAdd = new PopupWithForm(".popup_add", (values) => {
  modalAdd.changeButtonText('Сохранение...');
  api
    .addCard(values)
    .then((res) => cardList.addItem(createCard(res)))
    .then(() => modalAdd.closePopup())
    .catch((err) => console.log(err))
    .finally(() => modalAdd.changeButtonText('Сохранить'));
});
modalAdd.setEventListeners();
const modalView = new PopupWithImage(".popup_view");
modalView.setEventListeners();
const modalConfirm = new PopupWithConfirmation(".popup_confirm");
modalConfirm.setEventListeners();

function handleEditAvatar() {
  avatarPopup.changeButtonText("Сохранение...");
  api
    .updateAvatar(avatarInput.value)
    .then((res) => user.setAvatar(res.avatar))
    .then(() => avatarPopup.closePopup())
    .catch((err) => console.log(err))
    .finally(() => avatarPopup.changeButtonText("Сохранить"));
}
const avatarPopup = new PopupWithForm(".popup_change", handleEditAvatar);
avatarPopup.setEventListeners();
