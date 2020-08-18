import {createUserInfoTemplate} from './view/user-info.js';
import {createMenuTemplate} from './view/site-menu.js';
import {createSortTemplate} from './view/sort.js';
import {createFilmsWrapper} from './view/films-wrapper.js';
import {createFilmCard} from './view/card.js';
import {createShowMoreTemplate} from './view/show-more.js';
import {createStatisticsTemplate} from './view/statistics.js';
import {getFilm} from './mock/film.js';
import {getFilters} from './mock/filters.js';

const FILMS_COUNT = 22;
const FILMS_COUNT_IN_ROW = 5;

const films = Array(FILMS_COUNT).fill().map(() => getFilm());
const filters = getFilters(films);

console.log(films);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const header = document.querySelector(`.header`);
render(header, createUserInfoTemplate(), `beforeEnd`);

const main = document.querySelector(`.main`);
render(main, createMenuTemplate(filters), `beforeEnd`);
render(main, createSortTemplate(), `beforeEnd`);
render(main, createFilmsWrapper(), `beforeEnd`);


const filmsList = main.querySelector(`.films-list`);


const filmContainer = filmsList.querySelector(`.films-list__container`);
for (let i = 0; i < Math.min(films.length, FILMS_COUNT_IN_ROW); i++) {
  render(filmContainer, createFilmCard(films[i]), `beforeEnd`);
}

if (films.length > FILMS_COUNT_IN_ROW) {
  let currentFilmsInRow = FILMS_COUNT_IN_ROW;
  render(filmsList, createShowMoreTemplate(), `beforeEnd`);

  const loadMoreButton = filmsList.querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(currentFilmsInRow, currentFilmsInRow + FILMS_COUNT_IN_ROW)
      .forEach((film) => render(filmContainer, createFilmCard(film), `beforeEnd`));

    currentFilmsInRow += FILMS_COUNT_IN_ROW;

    if (films.length <= currentFilmsInRow) {
      loadMoreButton.remove();
    }
  });
}


const extraFilms = main.querySelectorAll(`.films-list--extra`);
const mostCommentedContainer = extraFilms[1].querySelector(`.films-list__container`);
render(mostCommentedContainer, createFilmCard(films[0]), `beforeEnd`);
render(mostCommentedContainer, createFilmCard(films[0]), `beforeEnd`);

const topRatingContainer = extraFilms[0].querySelector(`.films-list__container`);
render(topRatingContainer, createFilmCard(films[0]), `beforeEnd`);
render(topRatingContainer, createFilmCard(films[0]), `beforeEnd`);

const footer = document.querySelector(`.footer`);
render(footer, createStatisticsTemplate(), `beforeEnd`);
