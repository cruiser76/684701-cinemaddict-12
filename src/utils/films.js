const getWeightForNull = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortFilmsDate = (film1, film2) => {
  const weight = getWeightForNull(film1.releaseDate, film2.releaseDate);

  if (weight !== null) {
    return weight;
  }

  return film1.releaseDate - film2.releaseDate;
};

export const sortFilmsRating = (film1, film2) => {
  const weight = getWeightForNull(film1.rating, film2.rating);

  if (weight !== null) {
    return weight;
  }

  return film1.rating - film2.rating;
};
