import {Popup} from '../Popup/Popup.js';

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
        this.elementPopup.classList.remove("popup_opened");
        document.removeEventListener("keyup", this._closeByEscape);
        this.elementPopup.addEventListener("click", this._closeByOverlay);
        this.closeButton.addEventListener("click", this.closePopup);
    }

    setEventListeners = () => {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();

            const data = this._getInputValues();
            this.submit(data);

            console.log(this.form);
            this.closePopup();
        }, {once: true});

        this.closeButton.addEventListener("click", this.closePopup);
        document.addEventListener("keyup", this._closeByEscape);
        this.elementPopup.addEventListener("click", this._closeByOverlay);
    }
}
