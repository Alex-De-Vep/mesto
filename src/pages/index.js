//Стили
import './index.css';

//Импорты классов и данных
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import RemovePopup from "../components/removePopup.js";
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
    updateAvatarButton,
    avatarForm
} from "../utils/constants.js";

//Обновление изображения
const AvatarApi = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45/users/me/avatar',
    headers: {
        authorization: '70a5e760-58dc-4dc4-9be2-5d986802ee28',

    }
});

const updateAvatarPopup = new PopupWithForm("#update-avatar-popup", (data) => {
    updateAvatarPopup.showPreloader("Сохранение...");
    AvatarApi.updateAvatar(data, 'PATCH')
        .then(() => {
            updateAvatarPopup.showPreloader("Сохранилось");
        })
        .catch((err) => {
            console.log(err);
        });
});
updateAvatarButton.addEventListener("click", updateAvatarPopup.openPopup.bind(updateAvatarPopup))
updateAvatarPopup.setEventListeners();

const avatarFormValidation = new FormValidator(formValidationConfig, avatarForm);
avatarFormValidation.enableValidation();

//Получение данных с сервера
const userProfile = new UserInfo({selectorName: ".profile__title", selectorJob:".profile__text"});
const userInfoApi = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45/users/me',
    headers: {
        authorization: '70a5e760-58dc-4dc4-9be2-5d986802ee28',

    }
});
userInfoApi.getFetchRequest()
    .then((data) => {
        userProfile.setUserInfo(data);
    })
    .catch((err) => {
        console.log(err);
    });


//Попап  profile
const profilePopup = new PopupWithForm("#profile-popup", (data) => {
    userInfoApi.getFetchRequestWithBody(data, 'PATCH')
        .then((data) => {
            userProfile.setUserInfo(data);
        })
        .catch((err) => {
            console.log(err);
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

//Попап для добавления карточки
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const removePopup = new RemovePopup("#remove-card-popup");
removePopup.setEventListeners();

const cardsApi = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45/cards',
    headers: {
        authorization: '70a5e760-58dc-4dc4-9be2-5d986802ee28',

    }
});
cardsApi.getFetchRequest()
    .then((data) => {
        initTripCardList.renderItems(data);
    })
    .catch((err) => {
        console.log(err);
    });

const initCard = (data) => {
    const card = new Card('#card-template', data,
        cardsApi,
        {
            handleCardClick: imagePopup.openPopup,
            handleTrashClick: removePopup.openPopup.bind(removePopup),
        });

    const cardElement = card.createCard();
    removePopup.setCallbackFn(card.removeCard);
    initTripCardList.addItem(cardElement);
}
const initTripCardList = new Section(
    (data) => {
        initCard(data);
    },
    ".trips__list",
);

const tripPopup = new PopupWithForm("#trip-popup", (data) => {
    cardsApi.getFetchRequestWithBody(data, 'POST')
        .then((data) => {
            initCard(data);
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
