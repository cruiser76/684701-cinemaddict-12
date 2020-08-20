import {createElement} from './../utils.js';

const createFilmsContainerTemplate = () => {
  return (
    `<div class="films-list__container">
    </div>`
  );
};

class FilmsContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsContainerTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default FilmsContainer;
