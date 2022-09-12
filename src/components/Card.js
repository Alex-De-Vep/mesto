export class Card {
    selector;
    data;
    userInfo;

    constructor(selector, data, userInfo, {handleCardClick, handleTrashClick, handleLikeClick}) {
        this.name = data.name
        this.link = data.link;
        this.data = data;
        this.userInfo = userInfo;
        this.selector = selector;
        this._handlerCardClick = handleCardClick;
        this._handlerTrashClick = handleTrashClick;
        this._handlerLikeClick = handleLikeClick;
    }

    _getTemplate = () => {
        return document.querySelector(this.selector).content.cloneNode(true).querySelector('.trips__item')
    }

    removeCard = () => {
        this._itemCard.remove();
    }

    toggleLike = (data) => {
        this.likeCountElement.textContent = data.likes.length;
        this.cardLike.classList.toggle("card__button_active");
    }

    _setEventListeners = () => {
        this.cardTrash.addEventListener("click", this._handlerTrashClick);

        this.cardLike.addEventListener("click", () => {
            const method = this.cardLike.classList.contains("card__button_active") ? "DELETE" : "PUT";
            this._handlerLikeClick(method);
        });
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
        if (this.data.owner._id !== this.userInfo._id) {
            this.cardTrash.classList.add("card__trash_hidden");
        }

        this.cardLike = this._itemCard.querySelector(".card__button");
        this.likeCountElement = this._itemCard.querySelector(".card__count-like");
        this.likeCountElement.textContent = this.data.likes.length;
        if (this.data.likes.find((user) => user._id === this.userInfo._id)) {
            this.cardLike.classList.add("card__button_active");
        }

        this._setEventListeners();

        return this._itemCard;
    }
}
