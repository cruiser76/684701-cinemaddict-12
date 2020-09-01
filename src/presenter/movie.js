import MoviePopup from '../view/movie-popup.js';
import MovieCard from './../view/movie-card.js';

import {render} from './../utils/render.js';
import {RenderPosition} from './../const.js';

class Movie {
  constructor(cardContainer, mainView) {
    this._cardContainer = cardContainer;
    this._mainView = mainView;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._removePopup = this._removePopup.bind(this);
    this._onMovieCardClick = this._onMovieCardClick.bind(this);
    this._onCloseBtnClick = this._onCloseBtnClick.bind(this);
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._removePopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _removePopup() {
    this._moviePopupView.getElement().remove();
  }

  _onMovieCardClick() {
    render(this._mainView, this._moviePopupView, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onCloseBtnClick() {
    this._removePopup();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  init(movie) {
    this._movie = movie;
    this._movieCardView = new MovieCard(movie);
    this._moviePopupView = new MoviePopup(movie);

    this._movieCardView.setClickHandler(this._onMovieCardClick);
    this._moviePopupView.setCloseBtnClick(this._onCloseBtnClick);

    render(this._cardContainer, this._movieCardView, RenderPosition.BEFOREEND);
  }
}

export default Movie;
