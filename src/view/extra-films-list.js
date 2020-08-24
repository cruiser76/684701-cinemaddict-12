import AbstractComponent from './abstract.js';

const createExtraFilmsTemplate = (title) => {
  return (
    `<section class="films-list--extra">
        <h2 class="films-list__title">${title}</h2>
      </section>`
  );
};

class ExtraFilmsList extends AbstractComponent {
  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() {
    return createExtraFilmsTemplate(this._title);
  }
}

export default ExtraFilmsList;
