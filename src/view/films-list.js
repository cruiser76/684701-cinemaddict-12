import AbstractComponent from './abstract.js';

const createFilmsListTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>`
  );
};

class FilmsList extends AbstractComponent {
  getTemplate() {
    return createFilmsListTemplate();
  }
}

export default FilmsList;
