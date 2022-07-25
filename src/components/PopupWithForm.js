import {Popup} from './Popup.js';

export default class PopupWithForm extends Popup {
    selector;
    handleFormSubmit;

    constructor(selector, handleFormSubmit) {
        super(selector);
        this.handleFormSubmit = handleFormSubmit;
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
            this.handleFormSubmit(data);

            this.closePopup();
        });
        super.setEventListeners();
    }
}
