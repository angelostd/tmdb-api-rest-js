import { API_KEY } from "./env.js";

async function getTrendingMoviesPreview() {
    const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await response.json();

    const allMovies = [];

    const movies = data.results;
    movies.forEach(movie => {
        let moviePreview = `<img class="poster-container__img" src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}">`;
        allMovies.push(moviePreview);
    });
    console.log(allMovies);
    let container = document.getElementById('trending-section');
    container.innerHTML = allMovies.join('');
}

getTrendingMoviesPreview();