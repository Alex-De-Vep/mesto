const profilePopup = document.querySelector("#profile-popup");
let nameInput = profilePopup.querySelector("[data-name]");
let jobInput = profilePopup.querySelector("[data-job]");
const profileName = document.querySelector(".profile__title");
const profileText = document.querySelector(".profile__text");


//Общие для всех попапов

const togglePopup = (popup) => {
    popup.classList.toggle("popup_opened");
}

const closeButtons = document.querySelectorAll("[data-close-popup]")
closeButtons.forEach((button) => {
    const popup = button.closest(".popup");
    button.addEventListener("click", () => togglePopup(popup));
})

//Попап редактирования профиля

const openProfilePopupButton = document.querySelector("[data-popup-profile]");
openProfilePopupButton.addEventListener("click", () => {
    togglePopup(profilePopup);
    nameInput.value = profileName.textContent;
    jobInput.value = profileText.textContent;
})

function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileText.textContent = jobInput.value;

    togglePopup(profilePopup);
}
const profileForm = profilePopup.querySelector(".popup__form");
profileForm.addEventListener('submit', (event) => formSubmitHandler(event));

// popup.addEventListener("click", (event) => {
//     const {target, currentTarget} = event;
//     if (target === currentTarget) {
//         togglePopup();
//     }
// })

//Попап добавления карточки

const tripPopup = document.querySelector("#trip-popup");

const openTripPopupButton = document.querySelector("[data-popup-trip]");
openTripPopupButton.addEventListener("click", () => {
    togglePopup(tripPopup);
})

const addTripCard = (form) => {
    const titleInput = form.querySelector("[data-title]");
    const linkInput = form.querySelector("[data-link]");
    const card = createCard({name: titleInput.value, link: linkInput.value});

    const listCards = document.querySelector(".trips__list");
    listCards.prepend(card);
};

const tripForm = tripPopup.querySelector(".popup__form");
function tripFormSubmitHandler(evt) {
    evt.preventDefault();

    addTripCard(tripForm);
    togglePopup(tripPopup);
    tripForm.reset();
}
tripForm.addEventListener('submit', (event) => tripFormSubmitHandler(event));

//Попап открытия карточки

const imagePopup = document.querySelector("#image-popup");
const setValueImagePopup = (name, link) => {
    const image = imagePopup.querySelector(".popup__image");
    image.src = link;
    image.alt = `Полное изображение ${name}`;
    const title = imagePopup.querySelector(".popup__text");
    title.textContent = name;
}

//Добавление карточек из массива

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const toggleLike = ({target}) => {
    target.classList.toggle("card__button_active");
}

const removeCard = ({target}) => {
    const card = target.closest(".trips__item");
    card.remove();
}

const createCard = ({name, link}) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.trips__item').cloneNode(true)

    const image = card.querySelector(".card__image");
    image.src = link;
    image.alt = name
    const text = card.querySelector(".card__text");
    text.textContent = name;

    const imageButton = card.querySelector(".card__image-button");
    imageButton.addEventListener("click", () => {
        togglePopup(imagePopup);
        setValueImagePopup(name, link);
    });

    const cardTrash = card.querySelector(".card__trash");
    cardTrash.addEventListener("click", removeCard);

    const button = card.querySelector(".card__button");
    button.addEventListener("click", toggleLike);

    return card;
}

const listCards = document.querySelector(".trips__list");
initialCards.forEach((cardInfo) => {
    const card = createCard(cardInfo);
    listCards.append(card);
});
