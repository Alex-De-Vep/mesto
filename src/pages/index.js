//Стили
import './index.css';

//Импорты классов и данных
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import RemovePopup from "../components/RemovePopup.js";
import Api from "../components/Api.js";

//Импорты переменных
import {
    formValidationConfig,
    profileForm,
    nameInput,
    aboutInput,
    profilePopupOpenButton,
    tripForm,
    openTripPopupButton,
    avatarPopupButton,
    avatarForm
} from "../utils/constants.js";

//Api профиля
const userInfoApi = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45/users/me',
    headers: {
        authorization: '70a5e760-58dc-4dc4-9be2-5d986802ee28',
        'Content-Type': 'application/json'
    }
});

//Api карточек
const cardsApi = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45/cards',
    headers: {
        authorization: '70a5e760-58dc-4dc4-9be2-5d986802ee28',
        'Content-Type': 'application/json'
    }
});

//Api аватара
const avatarApi = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45/users/me/avatar',
    headers: {
        authorization: '70a5e760-58dc-4dc4-9be2-5d986802ee28',
        'Content-Type': 'application/json'
    }
});

const initTripCardList = new Section(
    (data) => {
        initCard(data);
    },
    ".trips__list",
);

const promises = [cardsApi.getFetchRequest(), userInfoApi.getFetchRequest()];
Promise.all(promises)
    .then((data) => {
        const [cards, userInfo] = data;
        userProfile.setUserInfo(userInfo);
        initTripCardList.renderItems(cards, userInfo);
    })
    .catch((err) => {
        console.log(err);
    });

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const removePopup = new RemovePopup("#remove-card-popup");
removePopup.setEventListeners();

const initCard = (data, isNew = false) => {
    const {item, userInfo} = data;
    const card = new Card('#card-template',item, userInfo, {
        handleCardClick: imagePopup.openPopup,
    });

    const cardElement = card.createCard();

    const trashButton = cardElement.querySelector(".card__trash");
    trashButton.addEventListener("click", () => {
        removePopup.openPopup();
        removePopup.setEventSubmitListeners(() => {
            cardsApi.getDeleteRequest(card.data._id)
                .then(() => {
                    card.removeCard();
                    removePopup.closePopup();
                })
                .catch((err) => {
                    console.log(err);
                })
        });
    });

    const likeButton = cardElement.querySelector(".card__button");
    likeButton.addEventListener("click", () => {
        const Method = likeButton.classList.contains("card__button_active") ? "DELETE" : "PUT";
        cardsApi.toggleLike(Method, `likes/${card.data._id}`)
            .then((data) => {
                card.toggleLike(data);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    if (isNew) {
        initTripCardList.addItemStart(cardElement);
        return;
    }

    initTripCardList.addItem(cardElement);
}

const tripPopup = new PopupWithForm("#trip-popup", (data) => {
    const promises = [cardsApi.getFetchRequestWithBody(data, 'POST'), userInfoApi.getFetchRequest()];
    Promise.all(promises)
        .then((data) => {
            const [item, userInfo] = data;
            initCard({item, userInfo}, true);
            tripPopup.closePopup();
        })
        .catch((err) => {
            console.log(err);
        });
});
tripPopup.setEventListeners();

const tripFormValidation = new FormValidator(formValidationConfig, tripForm);
tripFormValidation.enableValidation();

openTripPopupButton.addEventListener("click", () => {
    tripFormValidation.disabledButton();
    tripFormValidation.resetInputsErrors();
    tripPopup.openPopup();
})


//Модальное окно изменения аватара
const userProfile = new UserInfo({selectorName: ".profile__title", selectorJob:".profile__text", selectorAvatar: ".profile__image"});

const avatarPopup = new PopupWithForm("#update-avatar-popup", (data) => {
    avatarPopup.showPreloader("Сохранение...");
    avatarApi.updateAvatar(data, 'PATCH')
        .then((data) => {
            userProfile.setAvatar(data);
            avatarPopup.closePopup();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            avatarPopup.showPreloader("Сохранилось");
        });
});
avatarPopupButton.addEventListener("click", avatarPopup.openPopup.bind(avatarPopup))
avatarPopup.setEventListeners();

const avatarFormValidation = new FormValidator(formValidationConfig, avatarForm);
avatarFormValidation.enableValidation();



//Модальное окно  редактирования профиля
const profilePopup = new PopupWithForm("#profile-popup", (data) => {
    profilePopup.showPreloader("Сохранение...");
    userInfoApi.getFetchRequestWithBody(data, 'PATCH')
        .then((data) => {
            userProfile.setUserInfo(data);
            profilePopup.closePopup();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            profilePopup.showPreloader("Сохранилось");
        });
});

const profileFormValidation = new FormValidator(formValidationConfig, profileForm);
profileFormValidation.enableValidation();

const openProfilePopup = () => {
    profileFormValidation.resetInputsErrors();
    profileFormValidation.disabledButton();

    const data = userProfile.getUserInfo();
    nameInput.value = data.name;
    aboutInput.value = data.about;

    profilePopup.openPopup();
}
profilePopupOpenButton.addEventListener("click", openProfilePopup);
profilePopup.setEventListeners();
