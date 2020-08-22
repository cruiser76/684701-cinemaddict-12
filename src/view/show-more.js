import AbstractComponent from './abstract.js';

const createShowMoreTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

class ShowMore extends AbstractComponent {
  getTemplate() {
    return createShowMoreTemplate();
  }
}

export default ShowMore;
