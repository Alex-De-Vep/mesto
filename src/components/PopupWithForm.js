import {Popup} from './Popup.js';

export default class PopupWithForm extends Popup {
    selector;
    callBackFnSubmit;

    constructor(selector, callBackFnSubmit) {
        super(selector);
        this.elementPopup = document.querySelector(selector);
        this.submit = callBackFnSubmit;
        this.form = this.elementPopup.querySelector("form");
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
            this.submit(data);

            this.closePopup();
        });
        super.setEventListeners();
    }
}
