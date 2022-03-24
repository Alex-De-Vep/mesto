const popup = document.querySelector(".popup");
const form = popup.querySelector(".popup__form");
let nameInput = form.querySelector("[data-name]");
let jobInput = form.querySelector("[data-job]");
const profileName = document.querySelector(".profile__title");
const profileText = document.querySelector(".profile__text");

const togglePopup = () => {
    if (!popup.classList.contains("popup_opened")) {
        nameInput.value = profileName.textContent;
        jobInput.value = profileText.textContent;
    }

    popup.classList.toggle("popup_opened");
}

const openButton = document.querySelector("[data-open-popup]")
openButton.addEventListener("click", togglePopup);

const closeButton = popup.querySelector("[data-close-popup]")
closeButton.addEventListener("click", togglePopup);

// popup.addEventListener("click", (event) => {
//     const {target, currentTarget} = event;
//     if (target === currentTarget) {
//         togglePopup();
//     }
// })

function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileText.textContent = jobInput.value;
    popup.classList.remove("popup_opened");
}

form.addEventListener('submit', formSubmitHandler);