import UserInfo from './view/user-info.js';
import SiteMenu from './view/site-menu.js';
import Sort from './view/sort.js';
import FilmsBoard from './view/films-board.js';
import FilmsList from './view/films-list.js';
import ExtraFilmsList from './view/extra-films-list.js';
import FilmsContainer from './view/films-container.js';
import MovieCard from './view/movie-card.js';
import MoviePopup from './view/movie-popup';
import ShowMore from './view/show-more.js';
import Statistics from './view/statistics.js';
import {getFilm} from './mock/film.js';
import {getFilters} from './mock/filters.js';
import {render} from './utils.js';
import {RenderPosition, ExtraFilmsListName} from './const.js';
import NoFilms from './view/no-films.js';

const FILMS_COUNT = 17;
const FILMS_COUNT_IN_ROW = 5;

const films = Array(FILMS_COUNT).fill().map(() => getFilm());
const filters = getFilters(films);

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);


const renderMovieCard = (cardContainer, movie) => {
  const movieCardView = new MovieCard(movie);
  const moviePopupView = new MoviePopup(movie);

  const removePopup = () => {
    moviePopupView.getElement().remove();
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      removePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onMovieCardClick = (evt) => {
    evt.preventDefault();
    render(main, moviePopupView.getElement(), RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const onCloseBtnClick = (evt) => {
    evt.preventDefault();
    removePopup();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  movieCardView.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, onMovieCardClick);
  movieCardView.getElement().querySelector(`.film-card__title`).addEventListener(`click`, onMovieCardClick);
  movieCardView.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, onMovieCardClick);

  moviePopupView.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, onCloseBtnClick);

  render(cardContainer, movieCardView.getElement(), RenderPosition.BEFOREEND);
};

render(header, new UserInfo().getElement(), RenderPosition.BEFOREEND);
render(main, new SiteMenu(filters).getElement(), RenderPosition.BEFOREEND);
render(main, new Sort().getElement(), RenderPosition.BEFOREEND);

render(footer, new Statistics(films.length).getElement(), RenderPosition.BEFOREEND);

const renderFilmsBoard = (mainView, boardFilms) => {
  const filmsBoard = new FilmsBoard();
  render(mainView, filmsBoard.getElement(), RenderPosition.BEFOREEND);

  const filmsList = new FilmsList();
  render(filmsBoard.getElement(), filmsList.getElement(), RenderPosition.BEFOREEND);

  if (!boardFilms || boardFilms.length === 0) {
    render(filmsList.getElement(), new NoFilms().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  const filmsContainer = new FilmsContainer();
  render(filmsList.getElement(), filmsContainer.getElement(), RenderPosition.BEFOREEND);
  for (let i = 0; i < Math.min(boardFilms.length, FILMS_COUNT_IN_ROW); i++) {
    renderMovieCard(filmsContainer.getElement(), boardFilms[i]);
  }

  if (boardFilms.length > FILMS_COUNT_IN_ROW) {
    let currentFilmsInRow = FILMS_COUNT_IN_ROW;
    const showMoreBtn = new ShowMore();
    render(filmsList.getElement(), showMoreBtn.getElement(), RenderPosition.BEFOREEND);


    showMoreBtn.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      films
        .slice(currentFilmsInRow, currentFilmsInRow + FILMS_COUNT_IN_ROW)
        .forEach((film) => renderMovieCard(filmsContainer.getElement(), film, RenderPosition.BEFOREEND));

      currentFilmsInRow += FILMS_COUNT_IN_ROW;

      if (boardFilms.length <= currentFilmsInRow) {
        showMoreBtn.getElement().remove();
        showMoreBtn.removeElement();
      }
    });
  }

  const topRatingFilms = new ExtraFilmsList(ExtraFilmsListName.RATING);
  render(filmsBoard.getElement(), topRatingFilms.getElement(), RenderPosition.BEFOREEND);
  const topRatingContainer = new FilmsContainer();
  render(topRatingFilms.getElement(), topRatingContainer.getElement(), RenderPosition.BEFOREEND);
  renderMovieCard(topRatingContainer.getElement(), boardFilms[0], RenderPosition.BEFOREEND);
  renderMovieCard(topRatingContainer.getElement(), boardFilms[0], RenderPosition.BEFOREEND);

  const mostCommentedFilms = new ExtraFilmsList(ExtraFilmsListName.COMMENT);
  render(filmsBoard.getElement(), mostCommentedFilms.getElement(), RenderPosition.BEFOREEND);
  const mostCommentContainer = new FilmsContainer();
  render(mostCommentedFilms.getElement(), mostCommentContainer.getElement(), RenderPosition.BEFOREEND);
  renderMovieCard(mostCommentContainer.getElement(), boardFilms[0], RenderPosition.BEFOREEND);
  renderMovieCard(mostCommentContainer.getElement(), boardFilms[0], RenderPosition.BEFOREEND);
};

renderFilmsBoard(main, films);

