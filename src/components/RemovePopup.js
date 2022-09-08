import {Popup} from './Popup.js';

export default class RemovePopup extends Popup {
    selector;

    constructor(selector) {
        super(selector);
        this.form = this.elementPopup.querySelector("form");
    }

    setEventSubmitListeners = (callBackFn) => {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();

            callBackFn();
        });
    }

    openPopup = () => {
        this.setEventListeners();
        super.openPopup();
    }
}
