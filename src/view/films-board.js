import AbstractComponent from './abstract.js';

const createFilmsBoardTemplate = () => {
  return (
    `<section class="films">
    </section>`
  );
};

class FilmsBoard extends AbstractComponent {
  getTemplate() {
    return createFilmsBoardTemplate();
  }
}

export default FilmsBoard;

