import {Popup} from './Popup.js';

export default class RemovePopup extends Popup {
    selector;

    constructor(selector) {
        super(selector);
        this.form = this.elementPopup.querySelector("form");
    }

    setCallbackFn = (callbackFn) => {
        this.callbackFn = callbackFn;
    }

    setEventListeners = () => {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();

            this.callbackFn();
            this.closePopup();
        });

        super.setEventListeners();
    }
}
