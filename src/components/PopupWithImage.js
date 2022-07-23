import {Popup} from './Popup.js';

export default class PopupWithImage extends Popup {
    selector;

    constructor(selector) {
        super(selector);
        this.elementPopup = document.querySelector(selector);
        this.image = this.elementPopup.querySelector(".popup__image");
        this.title = this.elementPopup.querySelector(".popup__text");
    }

    _setValueImagePopup = (data) => {
        this.image.src = data.link;
        this.image.alt = `Полное изображение ${data.name}`;

        this.title.textContent = data.name;
    }

    openPopup = (data) => {
        this._setValueImagePopup(data);
        super.openPopup();
    }

    closePopup = () => {
        super.closePopup();
    }
}
