export class FormValidator {
    constructor(config, selector) {
        this.formSelector  = selector;
        this.inputSelector = config.inputSelector;
        this.submitButtonSelector = config.submitButtonSelector;
        this.inactiveButtonClass = config.inactiveButtonClass;
        this.inputErrorClass = config.inputErrorClass;
        this.errorClass = config.errorClass;
    }

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this.form.querySelector(`.popup__${inputElement.id}-error`);
        inputElement.classList.add(this.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.errorClass);
    };

    _hideInputError = (inputElement) => {
        const errorElement = this.form.querySelector(`.popup__${inputElement.id}-error`);
        inputElement.classList.remove(this.inputErrorClass);
        errorElement.classList.remove(this.errorClass);
        errorElement.textContent = '';
    };

    _hasInvalidInput = () => {
        return this.inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _toggleButtonState = (buttonElement) => {
        if (this._hasInvalidInput()) {
            buttonElement.classList.add(this.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }

    _setEventListeners = () => {
        this.inputList = Array.from(this.form.querySelectorAll(this.inputSelector));
        const buttonElement = this.form.querySelector(this.submitButtonSelector);
        this._toggleButtonState(buttonElement);
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(buttonElement);
            });
        });
    };

    resetInputsErrors = () => {
        this.inputList.forEach((inputElement) => {
            const errorElement = this.form.querySelector(`.popup__${inputElement.id}-error`);
            inputElement.classList.remove(this.inputErrorClass);
            errorElement.classList.remove(this.errorClass);
            errorElement.textContent = '';
        });
    };

    enableValidation = () => {
        this.form = document.querySelector(this.formSelector);
        this._setEventListeners();
    };
}
