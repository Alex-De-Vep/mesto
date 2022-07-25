//Стили
// import './index.css';

//Импорты классов и данных
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import RemovePopup from "../components/removePopup.js";

//Импорты переменных
import {formValidationConfig, profileForm, nameInput, aboutInput, profilePopupOpenButton, tripForm, openTripPopupButton} from "../utils/constants.js";

//Получение данных с сервера

const info = new UserInfo({selectorName: ".profile__title", selectorJob:".profile__text"});
info.setUserInfo();

//Попап  profile
const profilePopup = new PopupWithForm("#profile-popup", () => {
    info.setUserInfo();
}, {method: "PATCH", endpoint: "users/me"});

const profileFormValidation = new FormValidator(formValidationConfig, profileForm);
profileFormValidation.enableValidation();

const openProfilePopup = () => {
    profileFormValidation.resetInputsErrors();
    profileFormValidation.disabledButton();

    const data = info.getUserInfo();
    nameInput.value = data.name;
    aboutInput.value = data.about;

    profilePopup.openPopup();
}
profilePopupOpenButton.addEventListener("click", openProfilePopup);
profilePopup.setEventListeners();

//Попап для добавления карточки
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const removePopup = new RemovePopup("#remove-card-popup");
removePopup.setEventListeners();

const initCard = (data) => {
    const card = new Card('#card-template', data,
        {
            handleCardClick: imagePopup.openPopup,
            handleTrashClick: removePopup.openPopup,
            popupCallbackFn: removePopup.setCallbackFn
        });
    const cardElement = card.createCard();

    initTripCardList.addItem(cardElement);
}
const initTripCardList = new Section(
    (data) => {
        initCard(data);
    },
    ".trips__list",
);
function getCards() {
    fetch('https://mesto.nomoreparties.co/v1/cohort-45/cards', {
        headers: {
            authorization: '70a5e760-58dc-4dc4-9be2-5d986802ee28'
        }
    })
        .then((res) => {return res.json()})
        .then((data) => {
            initTripCardList.renderItems(data);
        });
}

getCards();

const tripPopup = new PopupWithForm("#trip-popup", (data) => {
    initCard(data);
}, {method: "POST", endpoint: "cards"});
tripPopup.setEventListeners();

const tripFormValidation = new FormValidator(formValidationConfig, tripForm);
tripFormValidation.enableValidation();

openTripPopupButton.addEventListener("click", () => {
    tripFormValidation.disabledButton();
    tripFormValidation.resetInputsErrors();
    tripPopup.openPopup();
})
