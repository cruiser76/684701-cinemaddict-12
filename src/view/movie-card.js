import {createElement} from '../utils.js';

const createFilmCardTemplate = (film) => {
  const {title, poster, description} = film;
  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">8.3</p>
      <p class="film-card__info">
        <span class="film-card__year">1929</span>
        <span class="film-card__duration">1h 55m</span>
        <span class="film-card__genre">Musical</span>
      </p>
      <img src="${poster}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">5 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

class MovieCard {
  constructor(film = {}) {
    this._element = null;
    this._film = film;
  }

  getTemplate(film) {
    return createFilmCardTemplate(film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(this._film));
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default MovieCard;