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

    randomWrapperPreview.innerHTML = "";
    randomWrapperPreview.append(...makeMovieContainerX(data2));
}

export async function getTopRatedMoviesPreview() {
    const { data } = await api('movie/top_rated');

    topRatedWrapperPreview.innerHTML = "";
    topRatedWrapperPreview.append(...makeMovieContainerX(data));
}

export async function getMoviesByCategory(id) {
    const {data} = await api('/discover/movie', {
        params: {
            with_genres: id,
        },
    });

    verticalMovieWrapperCategory.innerHTML = " ";
    verticalMovieWrapperCategory.append(...makeMovieContainerY(data))
}

export async function getMoviesBySearch(query) {
    const {data} = await api('/search/multi', {
        params: {
            query,
        },
    });

    verticalMovieWrapperSearch.innerHTML = " ";
    verticalMovieWrapperSearch.append(...makeMovieContainerY(data));
}

export async function getDetailsById(id) {
    console.log('lol');
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