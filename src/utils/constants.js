const profileForm = document.querySelector("[name=profile-form]");
const nameInput = profileForm.querySelector("[data-name]");
const aboutInput = profileForm.querySelector("[data-about]");
const profilePopupOpenButton = document.querySelector("[data-popup-profile]");

const tripForm = document.querySelector("[name=trip-form]");
const openTripPopupButton = document.querySelector("[data-popup-trip]");

const formValidationConfig = {
    formSelector: '.popup__form',
        inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

export {formValidationConfig, profileForm, nameInput, aboutInput, profilePopupOpenButton, tripForm, openTripPopupButton}
