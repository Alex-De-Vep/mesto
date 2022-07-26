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

    setUserInfo = (data) => {
        this.elemntName.textContent = data.name;
        this.elementJob.textContent = data.about;
    }
}
