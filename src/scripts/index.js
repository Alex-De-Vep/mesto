import {initialCards} from "./DataCards/cards.js";
import {Card} from "./Card/Card.js";
import {FormValidator} from "./FormValidator/FormValidator.js";
import {Section} from "./Section/Section.js";
import PopupWithImage from "./PopupWithImage/PopupWithImage.js";
import PopupWithForm from "./PopupWithForm/PopupWithForm.js";
import {UserInfo} from "./UserInfo/UserInfo.js";
import '../pages/index.css';

// Объявление переменных
const profileName = document.querySelector(".profile__title");
const profileText = document.querySelector(".profile__text");
const profileForm = document.querySelector(".popup__form");
const nameInput = profileForm.querySelector("[data-name]");
const jobInput = profileForm.querySelector("[data-job]");
const profilePopupOpenButton = document.querySelector("[data-popup-profile]");

const tripForm = document.querySelector(".popup__form");
const openTripPopupButton = document.querySelector("[data-popup-trip]");


//Попап  profile

const info = new UserInfo(".profile__title", ".profile__text");
const profilePopup = new PopupWithForm("#profile-popup", (data) => {
    info.setUserInfo(data);
});

const profileFormValidation = new FormValidator({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}, profileForm);
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

//Попап для добавления карточки

const imagePopup = new PopupWithImage("#image-popup");
const initTripCardList = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            const card = new Card('#card-template', item, imagePopup.openPopup);
            const cardElement = card.createCard();

            initTripCardList.addItem(cardElement);
        }
    },
    ".trips__list",
);
initTripCardList.rendererItems();

const tripPopup = new PopupWithForm("#trip-popup", (data) => {
    const card = new Card('#card-template', data, imagePopup.openPopup);
    const cardElement = card.createCard()

    initTripCardList.addItem(cardElement);
});

const tripFormValidation = new FormValidator({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}, tripForm);
tripFormValidation.enableValidation();

openTripPopupButton.addEventListener("click", () => {
    tripFormValidation.disabledButton();
    tripFormValidation.resetInputsErrors();
    tripPopup.openPopup();
})
