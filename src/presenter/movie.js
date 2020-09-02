import MoviePopup from '../view/movie-popup.js';
import MovieCard from './../view/movie-card.js';

import {render, remove, replace} from './../utils/render.js';
import {RenderPosition} from './../const.js';

const Mode = {
  DEFAULT: `DEFAULT`,
  POPUP: `POPUP`
};

class Movie {
  constructor(cardContainer, mainView, changeData, changeMode) {
    this._cardContainer = cardContainer;
    this._mainView = mainView;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._movieCardView = null;
    this._moviePopupView = null;
    this._mode = Mode.DEFAULT;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._removePopup = this._removePopup.bind(this);
    this._onMovieCardClick = this._onMovieCardClick.bind(this);
    this._onCloseBtnClick = this._onCloseBtnClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleWishClick = this._handleWishClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._mode = Mode.DEFAULT;
      this._moviePopupView.reset();
      this._removePopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _handleFormSubmit(movie) {
    this._changeData(movie);
    this._mode = Mode.DEFAULT;
    this._removePopup();
  }

  _removePopup() {
    this._mode = Mode.DEFAULT;
    this._moviePopupView.getElement().remove();
  }

  _onMovieCardClick() {
    render(this._mainView, this._moviePopupView, RenderPosition.BEFOREEND);
    this._changeMode();
    this._mode = Mode.POPUP;
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onCloseBtnClick() {
    this._moviePopupView.reset();
    this._removePopup();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._movie,
            {
              isFavorite: !this._movie.isFavorite
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._movie,
            {
              isWatched: !this._movie.isWatched
            }
        )
    );
  }

  _handleWishClick() {
    this._changeData(
        Object.assign(
            {},
            this._movie,
            {
              isInWatchlist: !this._movie.isInWatchlist
            }
        )
    );
  }

  init(movie) {
    this._movie = movie;

    const prevCardView = this._movieCardView;
    const prevPopupView = this._moviePopupView;


    this._movieCardView = new MovieCard(movie);
    this._moviePopupView = new MoviePopup(movie);

    this._movieCardView.setClickHandler(this._onMovieCardClick);
    this._movieCardView.setFavoriteClickHandler(this._handleFavoriteClick);
    this._movieCardView.setWatchedClickHandler(this._handleWatchedClick);
    this._movieCardView.setWishClickHandler(this._handleWishClick);

    this._moviePopupView.setCloseBtnClick(this._onCloseBtnClick);
    this._moviePopupView.setSubmit(this._handleFormSubmit);

    if (prevCardView === null || prevPopupView === null) {
      render(this._cardContainer, this._movieCardView, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._movieCardView, prevCardView);
    }

    if (this._mode === Mode.POPUP) {
      replace(this._moviePopupView, prevPopupView);
    }

    remove(prevCardView);
    remove(prevPopupView);
  }

  destroy() {
    remove(this._movieCardView);
    remove(this._moviePopupView);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._removePopup();
    }
  }
}

export default Movie;
