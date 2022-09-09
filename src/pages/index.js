//Стили
import './index.css';

//Импорты классов и данных
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import PopupConfirm from "../components/PopupConfirm.js";
import Api from "../components/Api.js";

//Импорты переменных
import {
    formValidationConfig,
    profileForm,
    nameInput,
    aboutInput,
    profilePopupOpenButton,
    addCardForm,
    openPopupAddCardButton,
    avatarPopupButton,
    avatarForm
} from "../utils/constants.js";

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
    headers: {
        authorization: '70a5e760-58dc-4dc4-9be2-5d986802ee28',
        'Content-Type': 'application/json'
    }
});

const userProfile = new UserInfo({selectorName: ".profile__title", selectorJob:".profile__text", selectorAvatar: ".profile__image"});

const cardList = new Section(
    (data) => {
        initCard(data);
    },
    ".trips__list",
);

const promises = [api.getCards(), api.getUserInfo()];
Promise.all(promises)
    .then((data) => {
        const [cards, userInfo] = data;
        userProfile.setUserInfo(userInfo);
        cardList.renderItems(cards, userInfo);
    })
    .catch((err) => {
        console.log(err);
    });

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const popupConfirmation = new PopupConfirm("#remove-card-popup");
popupConfirmation.setEventListeners();

const createdCard = ({item, userInfo}) => {
    const card = new Card('#card-template',item, userInfo, {
        handleCardClick: imagePopup.open,
        handleTrashClick: () => {
            popupConfirmation.open();
            popupConfirmation.setEventSubmitListeners(() => {
                api.deleteCard(card.data._id)
                    .then(() => {
                        card.removeCard();
                        popupConfirmation.close();
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
        },
        handleLikeClick: (method) => {
            api.toggleLike(method, card.data._id)
                .then((data) => {
                    card.toggleLike(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    });

    return card.createCard();
}

const initCard = (data, isNew = false) => {
    const cardElement = createdCard(data);

    if (isNew) {
        cardList.prependItem(cardElement);
        return;
    }

    cardList.appendItem(cardElement);
}

const popupAddCard = new PopupWithForm("#add-card-popup", (data) => {
    api.addCard(data, 'POST')
        .then((data) => {
            initCard({item: data, userInfo: data.owner}, true);
            popupAddCard.close();
        })
        .catch((err) => {
            console.log(err);
        });
});
popupAddCard.setEventListeners();

const addCardFormValidation = new FormValidator(formValidationConfig, addCardForm);
addCardFormValidation.enableValidation();

openPopupAddCardButton.addEventListener("click", () => {
    addCardFormValidation.disabledButton();
    addCardFormValidation.resetInputsErrors();
    popupAddCard.open();
})


//Модальное окно изменения аватара
const avatarPopup = new PopupWithForm("#update-avatar-popup", (data) => {
    avatarPopup.showPreloader("Сохранение...");
    api.updateAvatar(data, 'PATCH')
        .then((data) => {
            userProfile.setAvatar(data);
            avatarPopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            avatarPopup.showPreloader("Сохранилось");
        });
});
avatarPopupButton.addEventListener("click", avatarPopup.open.bind(avatarPopup))
avatarPopup.setEventListeners();

const avatarFormValidation = new FormValidator(formValidationConfig, avatarForm);
avatarFormValidation.enableValidation();



//Модальное окно  редактирования профиля
const profilePopup = new PopupWithForm("#profile-popup", (data) => {
    profilePopup.showPreloader("Сохранение...");
    api.updateUserInfo(data, 'PATCH')
        .then((data) => {
            userProfile.setUserInfo(data);
            profilePopup.close();
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

    profilePopup.open();
}
profilePopupOpenButton.addEventListener("click", openProfilePopup);
profilePopup.setEventListeners();
