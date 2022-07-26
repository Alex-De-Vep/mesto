export class Popup {
    selector;

    constructor(selector) {
        this.elementPopup = document.querySelector(selector);
        this.closeButton = this.elementPopup.querySelector("[data-close-popup]");
    }

    _closeByEscape = (event) => {
        if (event.key === "Escape") {
            this.closePopup();
        }
    }

    _closeByOverlay = ({target, currentTarget}) => {
        if (target === currentTarget) {
            this.closePopup();
        }
    }

    showPreloader = (text) => {
        this.submitButton = this.elementPopup.querySelector(".popup__button");
        this.submitButton.textContent = text;
    }

    setEventListeners() {
        this.closeButton.addEventListener("click", this.closePopup.bind(this));
        this.elementPopup.addEventListener("click", this._closeByOverlay);
    }

    openPopup() {
        document.addEventListener("keyup", this._closeByEscape);
        this.elementPopup.classList.add("popup_opened");
    }

    closePopup() {
        this.elementPopup.classList.remove("popup_opened");
        document.removeEventListener("keyup", this._closeByEscape);
    }
}
