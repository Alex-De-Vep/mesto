import {Popup} from './Popup.js';

export default class PopupWithForm extends Popup {
    selector;
    callBackFnSubmit;

    constructor(selector, callBackFnSubmit, {method, endpoint}) {
        super(selector);
        this.method = method;
        this.endpoint = endpoint;
        this.elementPopup = document.querySelector(selector);
        this.form = this.elementPopup.querySelector("form");
        this.submit = callBackFnSubmit;
    }

    _getInputValues = () => {
        const inputs = new FormData(this.form);
        const data = {};
        inputs.forEach((value, key) => {
            data[key] = value;
        });

        return data;
    }

    closePopup = () => {
        this.form.reset();
        super.closePopup();
    }

    setEventListeners = () => {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();

            const data = this._getInputValues();
            fetch(`https://mesto.nomoreparties.co/v1/cohort-45/${this.endpoint}`, {
                method: `${this.method}`,
                headers: {
                    authorization: '70a5e760-58dc-4dc4-9be2-5d986802ee28',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            this.submit(data);
            this.closePopup();
        });
        super.setEventListeners();
    }
}
