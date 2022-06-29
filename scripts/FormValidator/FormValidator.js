export class FormValidator {
    constructor(config, form) {
        this.inputSelector = config.inputSelector;
        this.submitButtonSelector = config.submitButtonSelector;
        this.inactiveButtonClass = config.inactiveButtonClass;
        this.inputErrorClass = config.inputErrorClass;
        this.errorClass = config.errorClass;
        this.form = form;
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

    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this.buttonElement.classList.add(this.inactiveButtonClass);
            this.buttonElement.disabled = true;
        } else {
            this.buttonElement.classList.remove(this.inactiveButtonClass);
            this.buttonElement.disabled = false;
        }
    }

    _setEventListeners = () => {
        this.inputList = Array.from(this.form.querySelectorAll(this.inputSelector));
        this.buttonElement = this.form.querySelector(this.submitButtonSelector);
        this._toggleButtonState();
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    disabledButton = () => {
        this.buttonElement.classList.add(this.inactiveButtonClass);
        this.buttonElement.disabled = true;
    }

    resetInputsErrors = () => {
        this.inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    };

    enableValidation = () => {
        this._setEventListeners();
    };
}
