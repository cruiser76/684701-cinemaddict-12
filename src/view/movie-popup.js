import AbstractComponent from './abstract.js';

const Emojis = {
  'emoji-smile': `smile`,
  'emoji-sleeping': `sleeping`,
  'emoji-puke': `puke`,
  'emoji-angry': `angry`,
};

const getUserEmojiTemplate = (emoji) => {
  if (!emoji) {
    return ``;
  }

  return (
    `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}"></img>`
  );
};


const createFilmPopupTemplate = (data, userComment) => {
  const {poster, isFavorite, isWatched, isInWatchlist} = data;
  const {emoji} = userComment;

  const userEmojiTemplate = getUserEmojiTemplate(emoji);

  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src=${poster} alt="">

            <p class="film-details__age">18+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">The Great Flamarion</h3>
                <p class="film-details__title-original">Original: The Great Flamarion</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">8.9</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">Anthony Mann</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">Anne Wigton, Heinz Herald, Richard Weil</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">Erich von Stroheim, Mary Beth Hughes, Dan Duryea</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">30 March 1945</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">1h 18m</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">USA</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">Drama</span>
                  <span class="film-details__genre">Film-Noir</span>
                  <span class="film-details__genre">Mystery</span></td>
              </tr>
            </table>

            <p class="film-details__film-description">
              The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Great Flamarion (Erich von Stroheim) is an arrogant, friendless, and misogynous marksman who displays his trick gunshot act in the vaudeville circuit. His show features a beautiful assistant, Connie (Mary Beth Hughes) and her drunken husband Al (Dan Duryea), Flamarion's other assistant. Flamarion falls in love with Connie, the movie's femme fatale, and is soon manipulated by her into killing her no good husband during one of their acts.
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" ${isInWatchlist ? `checked` : ``} id="watchlist" name="watchlist">
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" ${isWatched ? `checked` : ``} id="watched" name="watched">
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" ${isFavorite ? `checked` : ``} id="favorite" name="favorite">
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>

      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>

          <ul class="film-details__comments-list">
            <li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="./images/emoji/smile.png" width="55" height="55" alt="emoji-smile">
              </span>
              <div>
                <p class="film-details__comment-text">Interesting setting and a good cast</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">Tim Macoveev</span>
                  <span class="film-details__comment-day">2019/12/31 23:59</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>
            <li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="./images/emoji/sleeping.png" width="55" height="55" alt="emoji-sleeping">
              </span>
              <div>
                <p class="film-details__comment-text">Booooooooooring</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">John Doe</span>
                  <span class="film-details__comment-day">2 days ago</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>
            <li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="./images/emoji/puke.png" width="55" height="55" alt="emoji-puke">
              </span>
              <div>
                <p class="film-details__comment-text">Very very old. Meh</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">John Doe</span>
                  <span class="film-details__comment-day">2 days ago</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>
            <li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="./images/emoji/angry.png" width="55" height="55" alt="emoji-angry">
              </span>
              <div>
                <p class="film-details__comment-text">Almost two hours? Seriously?</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">John Doe</span>
                  <span class="film-details__comment-day">Today</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>
          </ul>

          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label">${userEmojiTemplate}</div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`
  );
};

class MoviePopup extends AbstractComponent {
  constructor(film = {}) {
    super();
    this._film = film;
    this._data = Object.assign({}, film);
    this._userComment = {};

    this._handleCloseBtnClick = this._handleCloseBtnClick.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleClickFavorite = this._handleClickFavorite.bind(this);
    this._handleClickWatched = this._handleClickWatched.bind(this);
    this._handleClickWish = this._handleClickWish.bind(this);

    this._handleEmojiClick = this._handleEmojiClick.bind(this);

    this._setInnerHandlers();
  }

  reset() {
    this._data = Object.assign({}, this._film);
    this._userComment = {};
    this.updateElement();
  }

  getTemplate() {
    return createFilmPopupTemplate(this._data, this._userComment);
  }

  removeElement() {
    this._element = null;
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._film = Object.assign(
        {},
        this._film,
        update
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    prevElement = null; // Чтобы окончательно "убить" ссылку на prevElement

    this.restoreHandlers();
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setSubmit(this._callback.onSubmit);
    this.setCloseBtnClick(this._callback.closeBtnClick);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`#favorite`)
      .addEventListener(`click`, this._handleClickFavorite);
    this.getElement()
      .querySelector(`#watched`)
      .addEventListener(`click`, this._handleClickWatched);
    this.getElement()
      .querySelector(`#watchlist`)
      .addEventListener(`click`, this._handleClickWish);
    this.getElement()
      .querySelector(`.film-details__emoji-list`)
      .addEventListener(`click`, this._handleEmojiClick);
  }

  _handleClickFavorite() {
    this._data.isFavorite = !this._data.isFavorite;
  }

  _handleClickWatched() {
    this._data.isWatched = !this._data.isWatched;
  }

  _handleClickWish() {
    this._data.isInWatchlist = !this._data.isInWatchlist;
  }

  _handleEmojiClick(evt) {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }
    this._userComment.emoji = Emojis[evt.target.id];
    this.updateElement();
  }

  _handleCloseBtnClick(evt) {
    evt.preventDefault();
    this._callback.closeBtnClick();
  }

  _handleSubmit(evt) {
    if (evt.key === `Enter` && evt.ctrlKey) {
      evt.preventDefault();
      this._callback.onSubmit(this._data);
      this._userComment = {};
    }
  }

  _resetSubmit(evt) {
    evt.preventDefault();
  }

  setCloseBtnClick(cb) {
    this._callback.closeBtnClick = cb;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._handleCloseBtnClick);
  }

  setSubmit(cb) {
    this._callback.onSubmit = cb;
    this.getElement().addEventListener(`keydown`, this._handleSubmit);
    this.getElement().addEventListener(`submit`, this._resetSubmit);
  }
}

export default MoviePopup;

