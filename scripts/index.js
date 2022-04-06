function initPopup({selector, profile = false, formSelector = '', buttonSelector, closePopup = () => {}, openPopup = () => {}}) {
    const popup = document.querySelector(selector);
    popup.classList.add("init");

    const getProfileForm = (profileForm) => {
        let nameInput = profileForm.querySelector("[data-name]");
        let jobInput = profileForm.querySelector("[data-job]");
        const profileName = document.querySelector(".profile__title");
        const profileText = document.querySelector(".profile__text");

        return {profileForm, nameInput, jobInput, profileName, profileText}
    }

    let profileForm;
    if (profile) {
        profileForm = getProfileForm(popup.querySelector(formSelector));
    }

    const setValueProfile = ({nameInput, jobInput, profileName, profileText}) => {
        nameInput.value = profileName.textContent;
        jobInput.value = profileText.textContent;
    }

    const togglePopup = () => {
        popup.classList.toggle("popup_opened");

        if (popup.classList.contains('popup_opened')) {
            openPopup();
        }
    }

    const openButtons = document.querySelectorAll(buttonSelector);
    openButtons.forEach((button) => {
        console.log(button);
        button.addEventListener("click", () => {
            togglePopup();

            if (profile) {
                setValueProfile(profileForm);
            }
        });
    });

    const closeButton = popup.querySelector("[data-close-popup]")
    closeButton.addEventListener("click", togglePopup);

    popup.addEventListener("click", (event) => {
        const {target, currentTarget} = event;
        if (target === currentTarget) {
            togglePopup();
        }
    })

    function formSubmitHandler(evt) {
        evt.preventDefault();

        popup.classList.remove("popup_opened");
    }


    if (!formSelector) {
        return;
    }
    const form = popup.querySelector(formSelector);

    form.addEventListener('submit', (event) => {
        formSubmitHandler(event);

        closePopup();

        if (profile) {
            const {profileName, profileText, nameInput, jobInput} = profileForm;
            profileName.textContent = nameInput.value;
            profileText.textContent = jobInput.value;
        }

        form.reset();
    });
}

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

const createElement = (element, className) => {
    const htmlElement = document.createElement(element);
    htmlElement.classList.add(className);

    return htmlElement;
}

const toggleLike = ({target}) => {
    target.classList.toggle("card__button_active");
}

const removeCard = ({target}) => {
    const card = target.closest(".trips__item");
    card.remove();
}

const getValueTripCard = ({target}) => {
    const card = target.closest(".card");
    const cardImage = card.querySelector(".card__image");
    const cardTitle = card.querySelector(".card__text");

    const popup = document.querySelector("#image-popup");
    const popupImage = popup.querySelector(".popup__image");
    popupImage.src = cardImage.src;
    popupImage.alt = `Полное изображение ${name}`;
    const popupTitle = popup.querySelector(".popup__text");
    popupTitle.textContent = cardTitle.textContent;
};

const createCard = ({name, link}) => {
    const imageButton = createElement("button", "card__image-button");
    const image = createElement("img", "card__image");
    image.src = link;
    image.alt = `Изображение ${name}`;
    imageButton.append(image);
    imageButton.addEventListener("click", (event) => getValueTripCard(event));

    const trash = createElement("button", "card__trash");
    trash.addEventListener("click", (event) => removeCard(event));

    const textWrapper = createElement("div", "card__info");
    const text = createElement("h3", "card__text");
    text.innerText = name;

    const button = createElement("button", "card__button");
    button.addEventListener("click", (event) => toggleLike(event));
    textWrapper.append(text, button);

    const article = createElement("article", "card");
    article.append(imageButton, textWrapper, trash);

    const item = createElement("li", "trips__item");
    item.append(article);
    const listCards = document.querySelector(".trips__list");
    listCards.prepend(item);
}

initialCards.forEach((cardInfo) => {
    createCard(cardInfo);
});

const addTripCard = () => {
    const form = document.querySelector("#trip-form");
    const titleInput = form.querySelector("[data-title]");
    const linkInput = form.querySelector("[data-link]");
    createCard({name: titleInput.value, link: linkInput.value});
};

initPopup({
    selector: "#profile-popup",
    profile: true,
    formSelector: "#profile-form",
    buttonSelector: "[data-popup-profile]",
});

initPopup({
    selector: "#trip-popup",
    formSelector: "#trip-form",
    buttonSelector: "[data-popup-trip]",
    closePopup: addTripCard,
});

initPopup({
    selector: "#image-popup",
    buttonSelector: ".card__image-button",
});
