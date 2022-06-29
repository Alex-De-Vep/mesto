export class Card {
    name;
    link;

    constructor(selector, data) {
        this.name = data.name;
        this.link = data.link;
        this.cardTemplate = document.querySelector(selector).content.cloneNode(true);
    }

    _removeCard = ({target}) => {
        const card = target.closest(".trips__item");
        card.remove();
    }

    _toggleLike = ({target}) => {
        target.classList.toggle("card__button_active");
    }

    addClickEventListener = (callBackFn = () => {}) => {
        const imageButton = this.cardTemplate.querySelector(".card__image-button");
        imageButton.addEventListener("click", callBackFn);
    }

    createCard = () => {
        const image = this.cardTemplate.querySelector(".card__image");
        image.src = this.link;
        image.alt = this.name;
        const text = this.cardTemplate.querySelector(".card__text");
        text.textContent = this.name;

        const cardTrash = this.cardTemplate.querySelector(".card__trash");
        cardTrash.addEventListener("click", this._removeCard);

        const button = this.cardTemplate.querySelector(".card__button");
        button.addEventListener("click", this._toggleLike);

        return this.cardTemplate;
    }
}
