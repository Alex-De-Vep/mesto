export default class Api {
    baseUrl;
    headers;

    constructor({baseUrl, headers}) {
        this.baseUrl = baseUrl;
        this.authorization = headers.authorization;
    }

    updateAvatar(data, method) {
        return fetch(this.baseUrl, {
            method,
            headers: {
                authorization: this.authorization,
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    toggleLike(method, cardId) {
        return fetch(`${this.baseUrl}/${cardId}`, {
            method,
            headers: {
                authorization: this.authorization,
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    getDeleteRequest(cardId) {
        return fetch(`${this.baseUrl}/${cardId}`, {
            method: "DELETE",
            headers: {
                authorization: this.authorization,
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    getFetchRequestWithBody(data, method) {
        return fetch(this.baseUrl, {
            method,
            headers: {
                authorization: this.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    getFetchRequest() {
        return fetch(this.baseUrl, {
            headers: {
                authorization: this.authorization,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
}
