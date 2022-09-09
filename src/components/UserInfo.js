export class UserInfo {
    constructor({selectorName, selectorJob, selectorAvatar}) {
        this.elemntName = document.querySelector(selectorName);
        this.elementJob = document.querySelector(selectorJob);
        this.elementAvatar = document.querySelector(selectorAvatar);
    }

    getUserInfo = () => {
        return {name: this.elemntName.textContent, about: this.elementJob.textContent}
    }

    setAvatar = (data) => {
        if(data.avatar) {
            this.elementAvatar.src = data.avatar;
        }
    }

    setUserInfo = (data) => {
        if(data.name) {
            this.elemntName.textContent = data.name;
        }

        if (data.about) {
            this.elementJob.textContent = data.about;
        }
    }
}
