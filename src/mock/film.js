import {getRandomInt} from './../utils/common.js';

const getRandomTitle = () => {
  const titles = [`Jojo Rabbit`, `Jumanji: The Next Level`, `Avengers: Infinity War`, `Top Gun`, `Birdman or (The Unexpected Virtue of Ignorance)`, `Becky`, `Blitz`, `Harry Potter and the Half-Blood Prince`];
  return titles[getRandomInt(0, titles.length - 1)];
};

const getRandomImg = () => {
  const images = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];
  return images[getRandomInt(0, images.length - 1)];
};

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`;

const getRandomPhrase = () => {
  let description = ``;
  for (let i = 1; i <= getRandomInt(1, 5); i++) {
    description += ` ${lorem.split(`.`)[getRandomInt(0, lorem.split(`.`).length - 1)]}.`;
  }
  return description.trim();
};

const getComments = () => {
  return {
    author: `John Doe`,
    date: new Date(),
    message: getRandomPhrase()
  };
};

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const getFilm = () => {
  const comments = Array(getRandomInt(0, 5)).fill().map(() => getComments());

  return {
    id: generateId(),
    title: getRandomTitle(),
    poster: `./images/posters/${getRandomImg()}`,
    description: getRandomPhrase(),
    comments,
    isWatched: Boolean(getRandomInt(0, 1)),
    isFavorite: Boolean(getRandomInt(0, 1)),
    isInWatchlist: Boolean(getRandomInt(0, 1)),
    releaseDate: getRandomInt(1920, 2020),
    rating: getRandomInt(1, 10)
  };
};

export {getFilm};
