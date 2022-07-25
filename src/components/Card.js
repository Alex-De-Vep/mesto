export class Card {
    selector;
    data;
    handleCardClick;

    constructor(selector, data, handleCardClick) {
        this.name = data.name;
        this.link = data.link;
        this.selector = selector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate = () => {
        return document.querySelector(this.selector).content.cloneNode(true).querySelector('.trips__item')
    }

    _removeCard = () => {
        this._itemCard.remove();
    }

    _toggleLike = () => {
        this.cardLike.classList.toggle("card__button_active");
    }

    createCard = () => {
        this._itemCard = this._getTemplate() ;
        const image = this._itemCard.querySelector(".card__image");
        image.src = this.link;
        image.alt = this.name;
        const text = this._itemCard.querySelector(".card__text");
        text.textContent = this.name;

        const imageButton = this._itemCard.querySelector(".card__image-button");
        imageButton.addEventListener("click", () => {
            this._handleCardClick({name: this.name, link: this.link});
        })

        this.cardTrash = this._itemCard.querySelector(".card__trash");
        this.cardTrash.addEventListener("click", () => {
            this._removeCard();
        });

        this.cardLike = this._itemCard.querySelector(".card__button");
        this.cardLike.addEventListener("click", this._toggleLike);

        return this._itemCard;
    }
}
