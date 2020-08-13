import {createUserInfoTemplate} from './view/user-info.js';
import {createMenuTemplate} from './view/site-menu.js';
import {createSortTemplate} from './view/sort.js';
import {createFilmsWrapper} from './view/films-wrapper.js';
import {createFilmCard} from './view/card.js';
import {createShowMoreTemplate} from './view/show-more.js';
import {createStatisticsTemplate} from './view/statistics.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const header = document.querySelector(`.header`);
render(header, createUserInfoTemplate(), `beforeEnd`);

const main = document.querySelector(`.main`);
render(main, createMenuTemplate(), `beforeEnd`);
render(main, createSortTemplate(), `beforeEnd`);
render(main, createFilmsWrapper(), `beforeEnd`);


const filmsList = main.querySelector(`.films-list`);
render(filmsList, createShowMoreTemplate(), `beforeEnd`);

const filmContainer = filmsList.querySelector(`.films-list__container`);
render(filmContainer, createFilmCard(), `beforeEnd`);
render(filmContainer, createFilmCard(), `beforeEnd`);
render(filmContainer, createFilmCard(), `beforeEnd`);
render(filmContainer, createFilmCard(), `beforeEnd`);
render(filmContainer, createFilmCard(), `beforeEnd`);

const extraFilms = main.querySelectorAll(`.films-list--extra`);
const mostCommentedContainer = extraFilms[1].querySelector(`.films-list__container`);
render(mostCommentedContainer, createFilmCard(), `beforeEnd`);
render(mostCommentedContainer, createFilmCard(), `beforeEnd`);

const topRatingContainer = extraFilms[0].querySelector(`.films-list__container`);
render(topRatingContainer, createFilmCard(), `beforeEnd`);
render(topRatingContainer, createFilmCard(), `beforeEnd`);

const footer = document.querySelector(`.footer`);
render(footer, createStatisticsTemplate(), `beforeEnd`);
