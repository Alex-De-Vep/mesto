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

    addItem = (element) => {
        this._container.prepend(element);
    }

    renderItems = (items) => {
        this._clear();

        items.forEach(item => {
            this.renderer(item);
        });
    }
}