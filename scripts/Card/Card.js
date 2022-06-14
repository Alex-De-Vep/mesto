export class Card {
    cardTemplate = document.querySelector('#card-template').content.cloneNode(true);

    name;
    link;

    constructor(card) {
        this.name = card.name;
        this.link = card.link;
    }

    _removeCard = ({target}) => {
        const card = target.closest(".trips__item");
        card.remove();
    }

    _toggleLike = ({target}) => {
        target.classList.toggle("card__button_active");
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
