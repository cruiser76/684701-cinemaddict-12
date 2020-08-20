import {createElement} from './../utils.js';

const createFiterItem = (filter, count) => {
  const filterTitle = `${filter[0].toUpperCase()}${filter.slice(1)}${filter === `all` ? ` movies` : ``}`;
  const countTemplate = filter === `all` ? `` : ` <span class="main-navigation__item-count">${count}</span>`;
  const activeClass = filter === `all` ? `main-navigation__item--active` : ``;

  return `<a href="#${filter}" class="main-navigation__item ${activeClass}">${filterTitle}${countTemplate}</a>`;
};

const createMenuTemplate = (filters) => {
  const filtersList = filters.map(({filter, count}) => {
    return createFiterItem(filter, count);
  }).join(``);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersList}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

class SiteMenu {
  constructor(filters = {}) {
    this._element = null;
    this._filters = filters;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
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

export default SiteMenu;
