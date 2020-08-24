import UserInfo from './view/user-info.js';
import SiteMenu from './view/site-menu.js';
import Sort from './view/sort.js';
import Statistics from './view/statistics.js';

import MovieList from './presenter/movie-list.js';
import {getFilm} from './mock/film.js';
import {getFilters} from './mock/filters.js';
import {render} from './utils/render.js';
import {RenderPosition} from './const.js';

const FILMS_COUNT = 15;

const films = Array(FILMS_COUNT).fill().map(() => getFilm());
const filters = getFilters(films);

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

render(header, new UserInfo(), RenderPosition.BEFOREEND);
render(main, new SiteMenu(filters), RenderPosition.BEFOREEND);
render(main, new Sort(), RenderPosition.BEFOREEND);

render(footer, new Statistics(films.length), RenderPosition.BEFOREEND);

const movieList = new MovieList(main);
movieList.init(films);
