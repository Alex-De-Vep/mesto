export default class Api {
    baseUrl;
    headers;
    avatar;

    constructor({baseUrl, headers}) {
        this.baseUrl = baseUrl;
        this.headers = headers
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }

        return res.json();
    }

    updateAvatar(data, method) {
        return fetch(this.baseUrl, {
            method,
            headers: this.headers,
            body: JSON.stringify(data)
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    toggleLike(method, cardId) {
        return fetch(`${this.baseUrl}/${cardId}`, {
            method,
            headers: this.headers,
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    getDeleteRequest(cardId) {
        return fetch(`${this.baseUrl}/${cardId}`, {
            method: "DELETE",
            headers: this.headers,
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    getFetchRequestWithBody(data, method) {
        return fetch(this.baseUrl, {
            method,
            headers: this.headers,
            body: JSON.stringify(data)
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    getFetchRequest() {
        return fetch(this.baseUrl, {
            headers: this.headers,
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }
}
