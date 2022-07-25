export class UserInfo {
    selectorName;
    selectorDescription;

    constructor({selectorName, selectorJob}) {
        this.elemntName = document.querySelector(selectorName);
        this.elementJob = document.querySelector(selectorJob);
    }

    getUserInfo = () => {
        return {name: this.elemntName.textContent, about: this.elementJob.textContent}
    }

    setAvatar = (data) => {
        this.image = document.querySelector(".profile__image");
        this.image.src = data.avatar;
    }

    setUserInfo = () => {
        fetch('https://mesto.nomoreparties.co/v1/cohort-45/users/me', {
            headers: {
                authorization: '70a5e760-58dc-4dc4-9be2-5d986802ee28'
            }
        })
            .then((res) => {return res.json()})
            .then((data) => {
                this.elemntName.textContent = data.name;
                this.elementJob.textContent = data.about;
            });
    }
}
