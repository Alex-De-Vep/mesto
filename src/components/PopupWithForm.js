import {Popup} from './Popup.js';

export default class PopupWithForm extends Popup {
    selector;
    handlerFormSubmit;

    constructor(selector, handlerFormSubmit) {
        super(selector);
        this.handlerFormSubmit = handlerFormSubmit;
        this.form = this.elementPopup.querySelector("form");
        this.inputs = this.form.querySelectorAll("input");
    }

    _getInputValues = () => {
        const data = {};
        this.inputs.forEach(({value, name}) => {
            data[name] = value;
        });

        return data;
    }

    showPreloader = (text) => {
        this.submitButton = this.elementPopup.querySelector(".popup__button");
        this.submitButton.textContent = text;
    }

    closePopup = () => {
        this.form.reset();
        super.closePopup();
    }

    setEventListeners = () => {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();

            const data = this._getInputValues();
            this.handlerFormSubmit(data);
        });
        super.setEventListeners();
    }
}
