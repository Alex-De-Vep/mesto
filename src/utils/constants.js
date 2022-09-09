const profileForm = document.querySelector("[name=profile-form]");
const nameInput = profileForm.querySelector("[data-name]");
const aboutInput = profileForm.querySelector("[data-about]");
const profilePopupOpenButton = document.querySelector("[data-popup-profile]");
const avatarForm = document.querySelector("[name=avatar-form]");
const avatarPopupButton = document.querySelector("[data-profile-image]");

const addCardForm = document.querySelector("[name=add-card-form]");
const openPopupAddCardButton = document.querySelector("[data-popup-add-card]");

const formValidationConfig = {
    formSelector: '.popup__form',
        inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

export {formValidationConfig, profileForm, nameInput, aboutInput, profilePopupOpenButton, addCardForm, openPopupAddCardButton, avatarPopupButton, avatarForm}
