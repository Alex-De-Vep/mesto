export class Card {
    name;
    link;

    constructor(selector, data, handleCardClick) {
        this.name = data.name;
        this.link = data.link;
        this.cardTemplate = document.querySelector(selector).content.cloneNode(true);
        this._handleCardClick = handleCardClick;
    }

    _removeCard = (card) => {
        card.remove();
    }

    _toggleLike = () => {
        this.cardLike.classList.toggle("card__button_active");
    }

    createCard = () => {
        const itemCard = this.cardTemplate.querySelector(".trips__item");
        const image = itemCard.querySelector(".card__image");
        image.src = this.link;
        image.alt = this.name;
        const text = itemCard.querySelector(".card__text");
        text.textContent = this.name;

        const imageButton = itemCard.querySelector(".card__image-button");
        imageButton.addEventListener("click", () => {
            this._handleCardClick({name: this.name, link: this.link});
        })

        this.cardTrash = itemCard.querySelector(".card__trash");
        this.cardTrash.addEventListener("click", () => {
            this._removeCard(itemCard);
        });

        this.cardLike = itemCard.querySelector(".card__button");
        this.cardLike.addEventListener("click", this._toggleLike);

        return this.cardTemplate;
    }
}
