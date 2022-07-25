export class Card {
    name;
    link;

    constructor(selector, data, {handleCardClick, handleTrashClick, popupCallbackFn}) {
        this.name = data.name;
        this.link = data.link;
        this.data = data;
        this.likes = data.likes ? data.likes.length : 0;
        this.cardTemplate = document.querySelector(selector).content.cloneNode(true);
        this._handleCardClick = handleCardClick;
        this._handleTrashClick = handleTrashClick;
        this._popupCallbackFn = popupCallbackFn;
    }

    _removeCard = (card) => {
        this._handleTrashClick();
        this._popupCallbackFn(() => {
            fetch(`https://mesto.nomoreparties.co/v1/cohortId/cards/${this.data._id}`, {
                method: "DELETE",
                headers: {
                    authorization: '70a5e760-58dc-4dc4-9be2-5d986802ee28',
                },
            });
            card.remove();
        });
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
        const userName = document.querySelector(".profile__title").textContent;
        if (userName === this.data.owner.name) {
            this.cardTrash.addEventListener("click", () => {
                this._removeCard(itemCard);
            });
        } else {
            this.cardTrash.classList.add("card__trash_hidden");
        }

        this.cardLike = itemCard.querySelector(".card__button");
        this.cardLike.addEventListener("click", this._toggleLike);
        this.likeCountElement = itemCard.querySelector(".card__count-like");
        this.likeCountElement.textContent = this.likes;

        return this.cardTemplate;
    }
}
