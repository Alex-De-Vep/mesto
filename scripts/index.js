import {initialCards} from "./DataCards/cards.js";
import {Card} from "./Card/Card.js";
import {FormValidator} from "./FormValidator/FormValidator.js";

// Объявление переменных
const profilePopup = document.querySelector("#profile-popup");
const profileName = document.querySelector(".profile__title");
const profileText = document.querySelector(".profile__text");
const profileForm = profilePopup.querySelector(".popup__form");
const nameInput = profileForm.querySelector("[data-name]");
const jobInput = profileForm.querySelector("[data-job]");
const profilePopupOpenButton = document.querySelector("[data-popup-profile]");

const cardsContainer = document.querySelector(".trips__list");
const tripPopup = document.querySelector("#trip-popup");
const tripForm = tripPopup.querySelector(".popup__form");
const titleInput = tripForm.querySelector("[data-title]");
const linkInput = tripForm.querySelector("[data-link]");
const submitFormButton = tripForm.querySelector(".popup__button");
const openTripPopupButton = document.querySelector("[data-popup-trip]");

const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");

const closeButtons = document.querySelectorAll("[data-close-popup]")


//Функции

const openPopup = (popup) => {
    popup.classList.add("popup_opened");
    document.addEventListener("keyup", closeByEscape);
}

const closePopup = (popup) => {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keyup", closeByEscape);
}

const closeByOverlay = ({target, currentTarget}) => {
    if (target === currentTarget) {
        closePopup(target);
    }
}

const closeByEscape = (event) => {
    if (event.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileText.textContent = jobInput.value;

    closePopup(profilePopup);
}

const openImagePopup = (data) => {
    setValueImagePopup(data.name, data.link);
    openPopup(imagePopup);
}

const getCard = (selector, data) => {
    const cardExemplar = new Card(selector, data, openImagePopup);
    return cardExemplar.createCard();
}

const addTripCard = () => {
    const card = getCard('#card-template', {name: titleInput.value, link: linkInput.value});
    cardsContainer.prepend(card);
};

function handleTripFormSubmit(evt) {
    evt.preventDefault();

    addTripCard();
    closePopup(tripPopup);
}

const setValueImagePopup = (name, link) => {
    popupImage.src = link;
    popupImage.alt = `Полное изображение ${name}`;
    const title = imagePopup.querySelector(".popup__text");
    title.textContent = name;
}

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
    nameInput.value = profileName.textContent;
    jobInput.value = profileText.textContent;
    openPopup(profilePopup);
}

//Обработчики событий

closeButtons.forEach((button) => {
    const popup = button.closest(".popup");
    button.addEventListener("click", () => closePopup(popup));
})

profilePopupOpenButton.addEventListener("click", openProfilePopup);
profileForm.addEventListener('submit', handleProfileFormSubmit);
profilePopup.addEventListener("click", closeByOverlay);

const tripFormValidation = new FormValidator({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}, tripForm);
tripFormValidation.enableValidation();

tripPopup.addEventListener("click", closeByOverlay);
openTripPopupButton.addEventListener("click", () => {
    tripForm.reset();
    tripFormValidation.disabledButton();
    tripFormValidation.resetInputsErrors();
    openPopup(tripPopup);
})
tripForm.addEventListener('submit', handleTripFormSubmit);

imagePopup.addEventListener("click", closeByOverlay);

initialCards.forEach((cardInfo) => {
    const card = getCard('#card-template', cardInfo, openImagePopup);
    cardsContainer.append(card);
});
