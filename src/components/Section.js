export class Section {
    items;
    renderer;

    constructor(renderer, containerSelector) {
        this.renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    _clear() {
        this._container.innerHTML = '';
    }

    appendItem = (element) => {
        this._container.append(element);
    }

    prependItem = (element) => {
        this._container.prepend(element);
    }

    renderItems = (items, userInfo) => {
        this._clear();

        items.forEach(item => {
            this.renderer({item, userInfo});
        });
    }
}
