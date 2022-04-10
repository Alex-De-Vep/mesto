// Объявление переменных
const profilePopup = document.querySelector("#profile-popup");
const profileName = document.querySelector(".profile__title");
const profileText = document.querySelector(".profile__text");
const profileForm = profilePopup.querySelector(".popup__form");
const nameInput = profileForm.querySelector("[data-name]");
const jobInput = profileForm.querySelector("[data-job]");
const openProfilePopupButton = document.querySelector("[data-popup-profile]");

const listCards = document.querySelector(".trips__list");
const tripPopup = document.querySelector("#trip-popup");
const tripForm = tripPopup.querySelector(".popup__form");
const titleInput = tripForm.querySelector("[data-title]");
const linkInput = tripForm.querySelector("[data-link]");
const submitFormButton = tripForm.querySelector(".popup__button");
const openTripPopupButton = document.querySelector("[data-popup-trip]");

const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");

const closeButtons = document.querySelectorAll("[data-close-popup]")

const cardTemplate = document.querySelector('#card-template').content;


//Функции

const disableFormButton = (popup) => {
    const submitFormButton = popup.querySelector('.popup__button');
    if (submitFormButton) {
        submitFormButton.classList.add('popup__button_disabled');
        submitFormButton.disabled = true;
    }
}

const openPopup = (popup) => {
    popup.classList.add("popup_opened");
}

const closePopup = (popup) => {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keyup", closeByEscape);
    disableFormButton(popup);
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

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileText.textContent = jobInput.value;

    closePopup(profilePopup);
}

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

const toggleLike = ({target}) => {
    target.classList.toggle("card__button_active");
}

const removeCard = ({target}) => {
    const card = target.closest(".trips__item");
    card.remove();
}

const setValueImagePopup = (name, link) => {
    popupImage.src = link;
    popupImage.alt = `Полное изображение ${name}`;
    const title = imagePopup.querySelector(".popup__text");
    title.textContent = name;
}

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


//Обработчики событий

closeButtons.forEach((button) => {
    const popup = button.closest(".popup");
    button.addEventListener("click", () => closePopup(popup));
})

openProfilePopupButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileText.textContent;
    openPopup(profilePopup);
    document.addEventListener("keyup", closeByEscape);
})
profileForm.addEventListener('submit', handleProfileFormSubmit);
profilePopup.addEventListener("click", closeByOverlay);



tripPopup.addEventListener("click", closeByOverlay);
openTripPopupButton.addEventListener("click", () => {
    openPopup(tripPopup);
    document.addEventListener("keyup", closeByEscape);
})
tripForm.addEventListener('submit', handleTripFormSubmit);



imagePopup.addEventListener("click", closeByOverlay);



initialCards.forEach((cardInfo) => {
    const card = createCard(cardInfo);
    listCards.append(card);
});
