import AbstractComponent from './abstract.js';

const createFilmsContainerTemplate = () => {
  return (
    `<div class="films-list__container">
    </div>`
  );
};

class FilmsContainer extends AbstractComponent {
  getTemplate() {
    return createFilmsContainerTemplate();
  }
}

export default FilmsContainer;
