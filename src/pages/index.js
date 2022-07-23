//Стили
import './index.css';

//Импорты классов и данных
import {initialCards} from "../utils/cards.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";

//Импорты переменных
import {formValidationConfig, profileForm, nameInput, jobInput, profilePopupOpenButton, tripForm, openTripPopupButton} from "../utils/constants.js";

//Попап  profile
const info = new UserInfo({selectorName: ".profile__title", selectorJob:".profile__text"});
const profilePopup = new PopupWithForm("#profile-popup", (data) => {
    info.setUserInfo(data);
});

const profileFormValidation = new FormValidator(formValidationConfig, profileForm);
profileFormValidation.enableValidation();

const openProfilePopup = () => {
    profileFormValidation.resetInputsErrors();
    profileFormValidation.disabledButton();

    const data = info.getUserInfo();
    nameInput.value = data.name;
    jobInput.value = data.job;

    profilePopup.openPopup();
}
profilePopupOpenButton.addEventListener("click", openProfilePopup);
profilePopup.setEventListeners();

//Попап для добавления карточки
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const initCard = (data) => {
    const card = new Card('#card-template', data, imagePopup.openPopup);
    const cardElement = card.createCard();

    initTripCardList.addItem(cardElement);
}

const initTripCardList = new Section(
    (data) => {
        initCard(data);
    },
    ".trips__list",
);
initTripCardList.renderItems(initialCards);

const tripPopup = new PopupWithForm("#trip-popup", (data) => {
    initCard(data);
});
tripPopup.setEventListeners();

const tripFormValidation = new FormValidator(formValidationConfig, tripForm);
tripFormValidation.enableValidation();

openTripPopupButton.addEventListener("click", () => {
    tripFormValidation.disabledButton();
    tripFormValidation.resetInputsErrors();
    tripPopup.openPopup();
})
