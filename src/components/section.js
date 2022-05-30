export class Section {
  constructor({renderer}, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  renderItems(cards) {
    this._cards = cards;
    this._cards.forEach((item) => {
      this._renderer(item);
    })
  }
  addItems(elem) {
    this._container.append(elem)
  }
}