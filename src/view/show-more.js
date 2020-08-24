import AbstractComponent from './abstract.js';

const createShowMoreTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

class ShowMore extends AbstractComponent {
  constructor() {
    super();
    this._handleBtnClick = this._handleBtnClick.bind(this);
  }

  getTemplate() {
    return createShowMoreTemplate();
  }

  _handleBtnClick(evt) {
    evt.preventDefault();
    this._callback.btnClick();
  }

  setShowMoreBtnClick(cb) {
    this._callback.btnClick = cb;
    this.getElement().addEventListener(`click`, this._handleBtnClick);
  }
}

export default ShowMore;
