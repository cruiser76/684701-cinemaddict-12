import {createElement} from './../utils.js';

const createExtraFilmsTemplate = (title) => {
  return (
    `<section class="films-list--extra">
        <h2 class="films-list__title">${title}</h2>
      </section>`
  );
};

class ExtraFilmsList {
  constructor(title) {
    this._element = null;
    this._title = title;
  }

  getTemplate() {
    return createExtraFilmsTemplate(this._title);
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

export default ExtraFilmsList;
