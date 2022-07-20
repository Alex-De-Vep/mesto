export class Section {
    items;
    renderer;

    constructor({items, renderer}, containerSelector) {
        this.items = items;
        this.renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    _clear() {
        this._container.innerHTML = '';
    }

    addItem = (element) => {
        this._container.prepend(element);
    }

    rendererItems = () => {
        this._clear();

        this.items.forEach(item => {
            this.renderer(item);
        });
    }
}
