//Общие для всех попапов

const openPopup = (popup) => {
    popup.classList.add("popup_opened");
}

const closePopup = (popup) => {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keyup", closeByEscape);
}

const closeByOverlay = ({target, currentTarget}) => {
    if (target === currentTarget) {
        closePopup(imagePopup);
    }
}

const closeByEscape = (event) => {
    if (event.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }
}

const closeButtons = document.querySelectorAll("[data-close-popup]")
closeButtons.forEach((button) => {
    const popup = button.closest(".popup");
    button.addEventListener("click", () => closePopup(popup));
})

//Попап редактирования профиля

const profilePopup = document.querySelector("#profile-popup");
const nameInput = profilePopup.querySelector("[data-name]");
const jobInput = profilePopup.querySelector("[data-job]");
const profileName = document.querySelector(".profile__title");
const profileText = document.querySelector(".profile__text");

const openProfilePopupButton = document.querySelector("[data-popup-profile]");
openProfilePopupButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileText.textContent;
    openPopup(profilePopup);
    document.addEventListener("keyup", closeByEscape);
})

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileText.textContent = jobInput.value;

    closePopup(profilePopup);
}
const profileForm = profilePopup.querySelector(".popup__form");
profileForm.addEventListener('submit', handleProfileFormSubmit);
profilePopup.addEventListener("click", closeByOverlay);

//Попап добавления карточки

const listCards = document.querySelector(".trips__list");
const tripPopup = document.querySelector("#trip-popup");
const tripForm = tripPopup.querySelector(".popup__form");
const titleInput = tripForm.querySelector("[data-title]");
const linkInput = tripForm.querySelector("[data-link]");

tripPopup.addEventListener("click", closeByOverlay);

const openTripPopupButton = document.querySelector("[data-popup-trip]");
openTripPopupButton.addEventListener("click", () => {
    openPopup(tripPopup);
    document.addEventListener("keyup", closeByEscape);
})


const addTripCard = () => {
    const card = createCard({name: titleInput.value, link: linkInput.value});
    listCards.prepend(card);
};

function handleTripFormSubmit(evt) {
    evt.preventDefault();

    addTripCard();
    closePopup(tripPopup);
    tripForm.reset();
}
tripForm.addEventListener('submit', handleTripFormSubmit);

//Попап открытия карточки

const imagePopup = document.querySelector("#image-popup");
imagePopup.addEventListener("click", closeByOverlay);

const popupImage = imagePopup.querySelector(".popup__image");
const setValueImagePopup = (name, link) => {
    popupImage.src = link;
    popupImage.alt = `Полное изображение ${name}`;
    const title = imagePopup.querySelector(".popup__text");
    title.textContent = name;
}

//Добавление карточек из массива

const toggleLike = ({target}) => {
    target.classList.toggle("card__button_active");
}

const removeCard = ({target}) => {
    const card = target.closest(".trips__item");
    card.remove();
}

const cardTemplate = document.querySelector('#card-template').content;
const createCard = ({name, link}) => {
    const card = cardTemplate.querySelector('.trips__item').cloneNode(true)

    const image = card.querySelector(".card__image");
    image.src = link;
    image.alt = name
    const text = card.querySelector(".card__text");
    text.textContent = name;

    const imageButton = card.querySelector(".card__image-button");
    imageButton.addEventListener("click", () => {
        setValueImagePopup(name, link);
        openPopup(imagePopup);
        document.addEventListener("keyup", closeByEscape);
    });

    const cardTrash = card.querySelector(".card__trash");
    cardTrash.addEventListener("click", removeCard);

    const button = card.querySelector(".card__button");
    button.addEventListener("click", toggleLike);

    return card;
}

initialCards.forEach((cardInfo) => {
    const card = createCard(cardInfo);
    listCards.append(card);
});
