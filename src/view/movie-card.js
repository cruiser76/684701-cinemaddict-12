import AbstractComponent from './abstract.js';

const createFilmCardTemplate = (film) => {
  const {title, poster, description, rating, releaseDate, isFavorite, isWatched, isInWatchlist, duration} = film;
  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseDate}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">Musical</span>
      </p>
      <img src="${poster}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">5 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isInWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
      </form>
    </article>`
  );
};

class MovieCard extends AbstractComponent {
  constructor(film = {}) {
    super();
    this._film = film;

    this._handleClick = this._handleClick.bind(this);
    this._handleClickFavorite = this._handleClickFavorite.bind(this);
    this._handleClickWatched = this._handleClickWatched.bind(this);
    this._handleClickWish = this._handleClickWish.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _handleClick(evt) {
    evt.preventDefault();
    this._callback.clickHandler();
  }

  _handleClickWish(evt) {
    evt.preventDefault();
    this._callback.clickWishHandler();
  }

  setWishClickHandler(cb) {
    this._callback.clickWishHandler = cb;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._handleClickWish);
  }

  _handleClickWatched(evt) {
    evt.preventDefault();
    this._callback.clickWatchedHandler();
  }

  setWatchedClickHandler(cb) {
    this._callback.clickWatchedHandler = cb;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._handleClickWatched);
  }

  _handleClickFavorite(evt) {
    evt.preventDefault();
    this._callback.clickFavoriteHandler();
  }

  setFavoriteClickHandler(cb) {
    this._callback.clickFavoriteHandler = cb;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._handleClickFavorite);
  }

  setClickHandler(cb) {
    this._callback.clickHandler = cb;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._handleClick);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._handleClick);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._handleClick);
  }
}

export default MovieCard;
