export class Popup {
    selector;

    constructor(selector) {
        this.elementPopup = document.querySelector(selector);
        this.closeButton = this.elementPopup.querySelector("[data-close-popup]");
    }

    _closeByEscape = (event) => {
        if (event.key === "Escape") {
            this.close();
        }
    }

    _closeByOverlay = ({target, currentTarget}) => {
        if (target === currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        this.closeButton.addEventListener("click", this.close.bind(this));
        this.elementPopup.addEventListener("click", this._closeByOverlay);
    }

    open() {
        document.addEventListener("keyup", this._closeByEscape);
        this.elementPopup.classList.add("popup_opened");
    }

    close() {
        this.elementPopup.classList.remove("popup_opened");
        document.removeEventListener("keyup", this._closeByEscape);
    }
}
