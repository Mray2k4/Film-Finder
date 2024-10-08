const tmdbKey = 'bb3e4912d2c50f421e083cfcbc77b1dd';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;


  try {
   const response = await fetch(urlToFetch)
   if (response.ok) {
    const jsonResponse = await response.json();
    const genres = jsonResponse.genres;
     return genres;
  
   }
  } 
  catch (error) {
    console.log(error)
  }
};

const getMovies = async () => {
  const selectedGenre = await getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genre=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      return movies;
      
    }
  } catch (error) {
    console.log(error);
  }
};
// getMovies()

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = response.joson();
      const movieInfo = jsonResponse;
      console.log(movieInfo)
      return movieInfo;
    }
  } catch (error) {
    console.log(error);
  }
};
getMovieInfo()

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };

};
getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;

