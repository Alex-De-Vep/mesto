export class Card {
    selector;
    data;
    apiCard;
    handleCardClick;
    handleTrashClick;

    constructor(selector, data, handleCardClick) {
        this.name = data.name;
        this.link = data.link;
        this.data = data;
        this.apiCard = apiCard;
        this.likes = data.likes ? data.likes.length : 0;
        this.selector = selector;
        this._handlerCardClick = handleCardClick;
        this._handlerTrashClick = handleTrashClick;
    }

    _getTemplate = () => {
        return document.querySelector(this.selector).content.cloneNode(true).querySelector('.trips__item')
    }

    _handleTrashClick = () => {
        this._handlerTrashClick();
    }

    removeCard = () => {
        this.apiCard.getDeleteRequest(this.data._id)
            .then(() => {
                this._itemCard.remove();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    _toggleLike = () => {
        if (this.cardLike.classList.contains("card__button_active")) {
            this.apiCard.toggleLike("DELETE", `likes/${this.data._id}`)
                .then(() => {
                    this.cardLike.classList.remove("card__button_active");
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            this.apiCard.toggleLike("PUT", `likes/${this.data._id}`)
                .then(() => {
                    this.cardLike.classList.add("card__button_active");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
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
            this._handlerCardClick({name: this.name, link: this.link});
        })

        this.cardTrash = this._itemCard.querySelector(".card__trash");
        const userName = document.querySelector(".profile__title").textContent;
        if (!this.data.owner || userName !== this.data.owner.name) {
            this.cardTrash.classList.add("card__trash_hidden");
        }

        this.cardTrash.addEventListener("click", () => {
            this._handleTrashClick();
        });

        this.cardLike = this._itemCard.querySelector(".card__button");
        this.cardLike.addEventListener("click", this._toggleLike);
        this.likeCountElement = this._itemCard.querySelector(".card__count-like");
        this.likeCountElement.textContent = this.likes;

        return this._itemCard;
    }
}
