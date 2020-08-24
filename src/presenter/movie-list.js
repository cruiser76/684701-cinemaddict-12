import {render} from './../utils/render.js';
import {RenderPosition, ExtraFilmsListName} from './../const.js';
import FilmsBoard from './../view/films-board.js';
import FilmsList from './../view/films-list.js';
import NoFilms from './../view/no-films.js';
import FilmsContainer from './../view/films-container.js';
import MovieCard from './../view/movie-card.js';
import MoviePopup from './../view/movie-popup.js';
import ShowMore from './../view/show-more.js';
import ExtraFilmsList from './../view/extra-films-list.js';

const FILMS_COUNT_IN_ROW = 5;

class MovieList {
  constructor(mainView) {
    this._mainView = mainView;

    this._filmsBoard = new FilmsBoard();
    this._filmsList = new FilmsList();
    this._noFilms = new NoFilms();
    this._filmsContainer = new FilmsContainer();
    this._showMoreBtn = new ShowMore();
  }

  init(films) {
    this._films = [...films];

    render(this._mainView, this._filmsBoard, RenderPosition.BEFOREEND);
    render(this._filmsBoard, this._filmsList, RenderPosition.BEFOREEND);

    if (!this._films || this._films.length === 0) {
      render(this._filmsList, this._noFilms, RenderPosition.BEFOREEND);
      return;
    }

    render(this._filmsList, this._filmsContainer, RenderPosition.BEFOREEND);
    for (let i = 0; i < Math.min(this._films.length, FILMS_COUNT_IN_ROW); i++) {
      this._renderMovieCard(this._filmsContainer, this._films[i]);
    }

    if (this._films.length > FILMS_COUNT_IN_ROW) {
      let currentFilmsInRow = FILMS_COUNT_IN_ROW;
      render(this._filmsList, this._showMoreBtn, RenderPosition.BEFOREEND);


      this._showMoreBtn.setShowMoreBtnClick(() => {
        films
          .slice(currentFilmsInRow, currentFilmsInRow + FILMS_COUNT_IN_ROW)
          .forEach((film) => this._renderMovieCard(this._filmsContainer.getElement(), film, RenderPosition.BEFOREEND));

        currentFilmsInRow += FILMS_COUNT_IN_ROW;

        if (this._films.length <= currentFilmsInRow) {
          this._showMoreBtn.getElement().remove();
          this._showMoreBtn.removeElement();
        }
      });
    }

    this._renderExtraFilms(ExtraFilmsListName.RATING);
    this._renderExtraFilms(ExtraFilmsListName.COMMENT);
  }


  _renderExtraFilms(title) {
    this._extraFilms = new ExtraFilmsList(title);
    render(this._filmsBoard, this._extraFilms, RenderPosition.BEFOREEND);

    this._extraFilmsContainer = new FilmsContainer();
    render(this._extraFilms, this._extraFilmsContainer, RenderPosition.BEFOREEND);

    this._renderMovieCard(this._extraFilmsContainer, this._films[0]);
    this._renderMovieCard(this._extraFilmsContainer, this._films[0]);
  }

  _renderMovieCard(cardContainer, movie) {
    this._movieCardView = new MovieCard(movie);
    this._moviePopupView = new MoviePopup(movie);

    const removePopup = () => {
      this._moviePopupView.getElement().remove();
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        removePopup();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onMovieCardClick = () => {
      render(this._mainView, this._moviePopupView, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const onCloseBtnClick = () => {
      removePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    this._movieCardView.setClickHandler(onMovieCardClick);

    this._moviePopupView.setCloseBtnClick(onCloseBtnClick);

    render(cardContainer, this._movieCardView, RenderPosition.BEFOREEND);
  }
}

export default MovieList;
