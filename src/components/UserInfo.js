export class UserInfo {
    selectorName;
    selectorJob;

    constructor({selectorName, selectorJob}) {
        this.elemntName = document.querySelector(selectorName);
        this.elementJob = document.querySelector(selectorJob);
    }

    getUserInfo = () => {
        return {name: this.elemntName.textContent, job: this.elementJob.textContent}
    }

    setUserInfo = (data) => {
        this.elemntName.textContent = data.name;
        this.elementJob.textContent = data.job;
    }
}
