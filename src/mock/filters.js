const filmsToFiltersMap = {
  all: (films) => films.length,
  watchlist: (films) => films.filter((film) => film.isInWatchlist).length,
  history: (films) => films.filter((film) => film.isWatched).length,
  favorites: (films) => films.filter((film) => film.isFavorite).length,
};

const getFilters = (films) => {
  return Object.entries(filmsToFiltersMap).map(([filterName, filterCount]) => {
    return {
      filter: filterName,
      count: filterCount(films)
    };
  });
};

export {getFilters};
