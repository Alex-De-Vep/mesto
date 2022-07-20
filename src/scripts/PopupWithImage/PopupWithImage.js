import {Popup} from '../Popup/Popup.js';

export default class PopupWithImage extends Popup {
    selector;

    constructor(selector) {
        super(selector);
        this.elementPopup = document.querySelector(selector);
    }

    _setValueImagePopup(data) {
        const image = this.elementPopup.querySelector(".popup__image");

        image.src = data.link;
        image.alt = `Полное изображение ${data.name}`;
        const title = this.elementPopup.querySelector(".popup__text");
        title.textContent = data.name;
    }

    openPopup = (data) => {
        this._setValueImagePopup(data);
        this.elementPopup.classList.add("popup_opened");
        this.setEventListeners();
    }
}
