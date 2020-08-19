import {createUserInfoTemplate} from './view/user-info.js';
import {createMenuTemplate} from './view/site-menu.js';
import {createSortTemplate} from './view/sort.js';
import {createFilmsWrapper} from './view/films-wrapper.js';
import {createFilmCard} from './view/card.js';
import ShowMore from './view/show-more.js';
import {createStatisticsTemplate} from './view/statistics.js';
import {getFilm} from './mock/film.js';
import {getFilters} from './mock/filters.js';
import {renderTemplate, RenderPosition, render} from './utils.js';

const FILMS_COUNT = 22;
const FILMS_COUNT_IN_ROW = 5;

const films = Array(FILMS_COUNT).fill().map(() => getFilm());
const filters = getFilters(films);

const header = document.querySelector(`.header`);
renderTemplate(header, createUserInfoTemplate(), `beforeEnd`);

const main = document.querySelector(`.main`);
renderTemplate(main, createMenuTemplate(filters), `beforeEnd`);
renderTemplate(main, createSortTemplate(), `beforeEnd`);
renderTemplate(main, createFilmsWrapper(), `beforeEnd`);


const filmsList = main.querySelector(`.films-list`);


const filmContainer = filmsList.querySelector(`.films-list__container`);
for (let i = 0; i < Math.min(films.length, FILMS_COUNT_IN_ROW); i++) {
  renderTemplate(filmContainer, createFilmCard(films[i]), `beforeEnd`);
}

if (films.length > FILMS_COUNT_IN_ROW) {
  let currentFilmsInRow = FILMS_COUNT_IN_ROW;
  render(filmsList, new ShowMore().getElement(), RenderPosition.BEFOREEND);

  const loadMoreButton = filmsList.querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(currentFilmsInRow, currentFilmsInRow + FILMS_COUNT_IN_ROW)
      .forEach((film) => renderTemplate(filmContainer, createFilmCard(film), `beforeEnd`));

    currentFilmsInRow += FILMS_COUNT_IN_ROW;

    if (films.length <= currentFilmsInRow) {
      loadMoreButton.remove();
    }
  });
}


const extraFilms = main.querySelectorAll(`.films-list--extra`);
const mostCommentedContainer = extraFilms[1].querySelector(`.films-list__container`);
renderTemplate(mostCommentedContainer, createFilmCard(films[0]), `beforeEnd`);
renderTemplate(mostCommentedContainer, createFilmCard(films[0]), `beforeEnd`);

const topRatingContainer = extraFilms[0].querySelector(`.films-list__container`);
renderTemplate(topRatingContainer, createFilmCard(films[0]), `beforeEnd`);
renderTemplate(topRatingContainer, createFilmCard(films[0]), `beforeEnd`);

const footer = document.querySelector(`.footer`);
renderTemplate(footer, createStatisticsTemplate(), `beforeEnd`);
