import { API_KEY } from "./env.js";
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
    },
});

export async function getTrendingMoviesPreview() {
    const { data } = await api('trending/all/day');

    trendingWrapperPreview.innerHTML = "";
    trendingWrapperPreview.append(...makeMovieContainerX(data));
}

export async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');

    moviesCategoriesContainer.innerHTML = "";
    moviesCategoriesContainer2.innerHTML = "";

    const allMovies = makeCategoryContainer(data?.genres);
    // const tvCategories = makeCategoryContainer(dataTV?.genres);

    let categoriesToInsert = allMovies.splice(0, 9);
    let categoriesToInsert2 = allMovies.splice(0, 9);
    // const tvContainer = document.getElementById('tv-categories-container');

    moviesCategoriesContainer.append(...categoriesToInsert);
    moviesCategoriesContainer2.append(...categoriesToInsert2);

}

export async function getRandomSeries() {
    const { data } = await api('genre/tv/list');
    let randomCategory = data.genres[getRandomInt(0, data.genres.length)];

    randomSectionTitle.innerHTML = randomCategory.name;
    let data2 = await innerFetch(randomCategory.id);

    const allSeries = [];
    const series = data2.results;

    series.forEach(serie => {
        // let moviePreview = `<img class="poster-container__img" src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}">`;
        let seriePreview = document.createElement('img');
        seriePreview.classList.add('poster-container__img')
        seriePreview.setAttribute('alt', serie.name);
        seriePreview.setAttribute('src', `https://image.tmdb.org/t/p/w300${serie.poster_path}`);

        seriePreview.addEventListener('click', () => {
            location.hash = `#details=${serie.id}-${serie.name}`;
        });

        allSeries.push(seriePreview);
    });

    randomWrapperPreview.innerHTML = "";
    randomWrapperPreview.append(...allSeries);
}

export async function getTopRatedMoviesPreview() {
    const { data } = await api('movie/top_rated');

    topRatedWrapperPreview.innerHTML = "";
    topRatedWrapperPreview.append(...makeMovieContainerX(data));
}

export async function getMoviesByCategory(id) {
    const { data } = await api('/discover/movie', {
        params: {
            with_genres: id,
        },
    });

    verticalMovieWrapperCategory.innerHTML = " ";
    verticalMovieWrapperCategory.append(...makeMovieContainerY(data))
}

export async function getMoviesBySearch(query) {
    const { data } = await api('/search/multi', {
        params: {
            query,
        },
    });

    verticalMovieWrapperSearch.innerHTML = " ";
    verticalMovieWrapperSearch.append(...makeMovieContainerY(data));
}

export async function getDetailsById(id) {
    const { data: movie } = await api(`movie/${id}`);
    console.log('movie :>> ', movie);

    const movieImgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    headerSection.style.backgroundImage = `
    linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(255,255,255,0) 16%),
    url('${movieImgUrl}')`

    detailsVote.innerText = `${Math.round(movie.vote_average * 1000) / 100}%`;

    let categoriesList = makeCategoryContainerLimited(movie.genres, 2);
    detailsCategories.innerHTML = "";
    detailsCategories.append(...categoriesList);

    detailsOverview.innerText = movie.overview;
}

export async function getRelatedContentById(id) {
    const { data } = await api(`movie/${id}/recommendations`);

    detailsRelatedContent.innerHTML = "";
    detailsRelatedContent.append(...makeMovieContainerX(data));
}

// Aux fn
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function makeCategoryContainer(array) {
    const container = [];
    for (let index = 0; index < array.length; index++) {
        // const category = `<a href="#"><span id="${array[index].id}" class="category">${array[index].name}</span></a>`;

        // const category = document.createElement('a');
        // category.href = "#";

        const category = document.createElement('p');
        category.setAttribute('id', 'id' + array[index].id);
        category.classList.add('category');
        category.innerText = `${array[index].name}`;
        category.addEventListener('click', () => {
            // console.log(array[index].id, array[index].name);
            location.hash = `#category=${array[index].id}-${array[index].name}`;
        });

        container.push(category);
    }
    return container;
}

function makeCategoryContainerLimited(array, limit) {
    const container = [];
    for (let index = 0; index < limit; index++) {
        // const category = `<a href="#"><span id="${array[index].id}" class="category">${array[index].name}</span></a>`;

        // const category = document.createElement('a');
        // category.href = "#";

        const category = document.createElement('p');
        category.setAttribute('id', 'id' + array[index].id);
        category.classList.add('category');
        category.innerText = `${array[index].name}`;
        category.addEventListener('click', () => {
            // console.log(array[index].id, array[index].name);
            location.hash = `#category=${array[index].id}-${array[index].name}`;
        });

        container.push(category);
    }
    return container;
}

function makeMovieContainerX(data) {
    const allMovies = [];
    const movies = data.results;

    movies.forEach(movie => {
        // let moviePreview = `<img class="poster-container__img" src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}">`;
        let moviePreview = document.createElement('img');
        moviePreview.classList.add('poster-container__img')
        moviePreview.setAttribute('alt', movie.title);
        moviePreview.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);

        moviePreview.addEventListener('click', () => {
            location.hash = `#details=${movie.id}-${movie.title}`;
        });

        allMovies.push(moviePreview);
    });

    return allMovies;
}

function makeMovieContainerY(data) {
    const allMovies = [];
    const movies = data.results;

    movies.forEach(movie => {
        // let moviePreview = `<img class="poster-container__img" src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}">`;
        let moviePreview = document.createElement('img');
        moviePreview.classList.add('poster-wrapper__img')
        moviePreview.addEventListener
        moviePreview.setAttribute('alt', movie.title);
        moviePreview.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);

        moviePreview.addEventListener('click', () => {
            location.hash = `#details=${movie.id}-${movie.title}`;
        });

        allMovies.push(moviePreview);
    });

    return allMovies;
}

async function innerFetch(id) {
    const { data } = await api('/discover/tv', {
        params: {
            with_genres: id,
        },
    });

    return data;
}