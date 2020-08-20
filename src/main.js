import UserInfo from './view/user-info.js';
import SiteMenu from './view/site-menu.js';
import Sort from './view/sort.js';
import FilmsWrapper from './view/films-wrapper.js';
import MovieCard from './view/movie-card.js';
import MoviePopup from './view/movie-popup';
import ShowMore from './view/show-more.js';
import Statistics from './view/statistics.js';
import {getFilm} from './mock/film.js';
import {getFilters} from './mock/filters.js';
import {RenderPosition, render} from './utils.js';

const FILMS_COUNT = 22;
const FILMS_COUNT_IN_ROW = 5;

const films = Array(FILMS_COUNT).fill().map(() => getFilm());
const filters = getFilters(films);

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
render(header, new UserInfo().getElement(), RenderPosition.BEFOREEND);

const renderMovieCard = (cardContainer, movie) => {
  const movieCardView = new MovieCard(movie);
  const moviePopupView = new MoviePopup(movie);

  const onMovieCardClick = (evt) => {
    evt.preventDefault();
    render(cardContainer, moviePopupView.getElement(), RenderPosition.BEFOREEND);
  };

  const onCloseBtnClick = (evt) => {
    evt.preventDefault();
    moviePopupView.getElement().remove();
  };

  movieCardView.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, onMovieCardClick);
  movieCardView.getElement().querySelector(`.film-card__title`).addEventListener(`click`, onMovieCardClick);
  movieCardView.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, onMovieCardClick);

  moviePopupView.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, onCloseBtnClick);

  render(cardContainer, movieCardView.getElement(), RenderPosition.BEFOREEND);
};

render(main, new SiteMenu(filters).getElement(), RenderPosition.BEFOREEND);
render(main, new Sort().getElement(), RenderPosition.BEFOREEND);
render(main, new FilmsWrapper().getElement(), RenderPosition.BEFOREEND);

const filmsList = main.querySelector(`.films-list`);


const filmContainer = filmsList.querySelector(`.films-list__container`);
for (let i = 0; i < Math.min(films.length, FILMS_COUNT_IN_ROW); i++) {
  renderMovieCard(filmContainer, films[i]);
}

if (films.length > FILMS_COUNT_IN_ROW) {
  let currentFilmsInRow = FILMS_COUNT_IN_ROW;
  const showMoreBtn = new ShowMore();
  render(filmsList, showMoreBtn.getElement(), RenderPosition.BEFOREEND);


  showMoreBtn.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(currentFilmsInRow, currentFilmsInRow + FILMS_COUNT_IN_ROW)
      .forEach((film) => renderMovieCard(filmContainer, film, RenderPosition.BEFOREEND));

    currentFilmsInRow += FILMS_COUNT_IN_ROW;

    if (films.length <= currentFilmsInRow) {
      showMoreBtn.getElement().remove();
      showMoreBtn.removeElement();
    }
  });
}


const extraFilms = main.querySelectorAll(`.films-list--extra`);
const mostCommentedContainer = extraFilms[1].querySelector(`.films-list__container`);
renderMovieCard(mostCommentedContainer, films[0], RenderPosition.BEFOREEND);
renderMovieCard(mostCommentedContainer, films[0], RenderPosition.BEFOREEND);

const topRatingContainer = extraFilms[0].querySelector(`.films-list__container`);
renderMovieCard(topRatingContainer, films[0], RenderPosition.BEFOREEND);
renderMovieCard(topRatingContainer, films[0], RenderPosition.BEFOREEND);

const footer = document.querySelector(`.footer`);
render(footer, new Statistics().getElement(), RenderPosition.BEFOREEND);
