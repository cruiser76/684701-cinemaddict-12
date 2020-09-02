import {render} from './../utils/render.js';
import {RenderPosition, ExtraFilmsListName} from './../const.js';
import FilmsBoard from './../view/films-board.js';
import FilmsList from './../view/films-list.js';
import NoFilms from './../view/no-films.js';
import FilmsContainer from './../view/films-container.js';
import ShowMore from './../view/show-more.js';
import ExtraFilmsList from './../view/extra-films-list.js';
import Sort from './../view/sort.js';
import {SortType} from './../const.js';
import {sortFilmsDate, sortFilmsRating} from './../utils/films.js';
import {updateItem} from './../utils/common.js';
import Movie from './movie.js';

const FILMS_COUNT_IN_ROW = 5;

class MovieList {
  constructor(mainView) {
    this._mainView = mainView;
    this._currentSortType = SortType.DEFAULT;
    this._renderedFilmsCount = FILMS_COUNT_IN_ROW;

    this._movieListPresenter = {};
    this._movieRatingPresenter = {};
    this._movieCommentPresenter = {};

    this._filmsBoard = new FilmsBoard();
    this._filmsList = new FilmsList();
    this._noFilms = new NoFilms();

    this._showMoreBtn = new ShowMore();
    this._sort = new Sort(this._currentSortType);

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleMovieChange = this._handleMovieChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(films) {
    this._films = [...films];
    this._sourcedBoardFilms = [...films];

    this._renderSort();

    render(this._mainView, this._filmsBoard, RenderPosition.BEFOREEND);
    render(this._filmsBoard, this._filmsList, RenderPosition.BEFOREEND);

    this._renderFilmsList();

    this._renderExtraFilms(ExtraFilmsListName.RATING);
    this._renderExtraFilms(ExtraFilmsListName.COMMENT);
  }

  _handleModeChange() {
    Object
      .values(this._movieListPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleMovieChange(updatedMovie) {
    this._films = updateItem(this._films, updatedMovie);
    this._sourcedBoardFilms = updateItem(this._sourcedBoardFilms, updatedMovie);
    this._movieListPresenter[updatedMovie.id].init(updatedMovie);
    if (this._movieRatingPresenter[updatedMovie.id]) {
      this._movieRatingPresenter[updatedMovie.id].init(updatedMovie);
    }
    if (this._movieCommentPresenter[updatedMovie.id]) {
      this._movieCommentPresenter[updatedMovie.id].init(updatedMovie);
    }
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._films.sort(sortFilmsDate);
        break;
      case SortType.RATING:
        this._films.sort(sortFilmsRating);
        break;
      default:
        this._films = this._sourcedBoardFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _clearFilmList() {
    this._filmsContainer.getElement().remove();
    this._renderedFilmsCount = FILMS_COUNT_IN_ROW;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderFilmsList();
  }

  _renderSort() {
    render(this._mainView, this._sort, RenderPosition.BEFOREEND);
    this._sort.setSortTypeChange(this._handleSortTypeChange);
  }

  _renderFilmsList() {
    this._filmsContainer = new FilmsContainer();

    if (!this._films || this._films.length === 0) {
      render(this._filmsList, this._noFilms, RenderPosition.BEFOREEND);
      return;
    }

    render(this._filmsList, this._filmsContainer, RenderPosition.BEFOREEND);
    for (let i = 0; i < Math.min(this._films.length, FILMS_COUNT_IN_ROW); i++) {
      this._renderMovieCard(this._filmsContainer, this._films[i], this._movieListPresenter);
    }

    if (this._films.length > FILMS_COUNT_IN_ROW) {
      render(this._filmsList, this._showMoreBtn, RenderPosition.BEFOREEND);


      this._showMoreBtn.setShowMoreBtnClick(() => {
        this._films
          .slice(this._renderedFilmsCount, this._renderedFilmsCount + FILMS_COUNT_IN_ROW)
          .forEach((film) => this._renderMovieCard(this._filmsContainer, film, this._movieListPresenter));

        this._renderedFilmsCount += FILMS_COUNT_IN_ROW;

        if (this._films.length <= this._renderedFilmsCount) {
          this._showMoreBtn.getElement().remove();
          this._showMoreBtn.removeElement();
        }
      });
    }

  }

  _renderExtraFilms(title) {
    const presenter = title === ExtraFilmsListName.RATING
      ? this._movieRatingPresenter
      : this._movieCommentPresenter;
    this._extraFilms = new ExtraFilmsList(title);
    render(this._filmsBoard, this._extraFilms, RenderPosition.BEFOREEND);

    this._extraFilmsContainer = new FilmsContainer();
    render(this._extraFilms, this._extraFilmsContainer, RenderPosition.BEFOREEND);

    this._renderMovieCard(this._extraFilmsContainer, this._films[0], presenter);
    this._renderMovieCard(this._extraFilmsContainer, this._films[0], presenter);
  }

  _renderMovieCard(cardContainer, movie, presenterStore) {
    const moviePresenter = new Movie(cardContainer, this._mainView, this._handleMovieChange, this._handleModeChange);
    moviePresenter.init(movie);
    presenterStore[movie.id] = moviePresenter;
  }
}

export default MovieList;
