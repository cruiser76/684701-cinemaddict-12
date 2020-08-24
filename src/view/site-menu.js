import AbstractComponent from './abstract.js';

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

class SiteMenu extends AbstractComponent {
  constructor(filters = {}) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
  }
}

export default SiteMenu;
