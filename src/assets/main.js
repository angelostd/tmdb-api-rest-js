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
    const { data: movies } = await api('trending/movie/day');
    const { data: series } = await api('trending/tv/day');

    trendingWrapperMovies.innerHTML = "";
    trendingWrapperSeries.innerHTML = "";
    trendingWrapperMovies.append(...makeMovieContainerX(movies));
    trendingWrapperSeries.append(...makeSeriesContainerX(series));
}

export async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');

    const allCategories = makeCategoryContainer(data?.genres);

    // console.log('allCategories :>> ', data?.genres);
    categoriesWrapperPreview.innerHTML = "";
    categoriesWrapperPreview.append(...allCategories);

}

export async function getRandomSeries() {
    const { data } = await api('genre/tv/list');
    let randomCategory = data.genres[getRandomInt(0, data.genres.length)];

    randomSectionTitle.innerHTML = randomCategory.name;
    let data2 = await innerFetch(randomCategory.id);

    randomWrapperPreview.innerHTML = "";
    randomWrapperPreview.append(...makeSeriesContainerX(data2));
}

export async function getRandomHeader(params) {
    // TODO
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
    try {
        const content = document.getElementById(id);
        const dataType = content.dataset.type;

        if (dataType === 'movie') {
            getMovieById(id);
        } else {
            getSerieById(id);
        }
    } catch (error) {
        console.log('it fails when reload');
    }
}

export async function getRelatedContentById(id) {
    try {
        const content = document.getElementById(id);
        const dataType = content.dataset.type;

        if (dataType === 'movie') {
            getMoviesRelated(id);
        } else {
            getSeriesRelated(id);
        }
    } catch (error) {
        console.log('it fails when reload');
    }
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

        const category = document.createElement('div');
        const label = document.createElement('p');

        console.log(array[index].id, array[index].name);
        label.innerText = `${array[index].name}`;
        category.addEventListener('click', () => {
            location.hash = `#category=${array[index].id}-${array[index].name}`;
        });

        category.setAttribute('id', 'id' + array[index].id);
        category.classList.add('category');

        category.append(label);
        container.push(category);
    }

    return container;
}

function makeCategoryLabelsContainerLimited(array, limit) {
    const container = [];
    for (let index = 0; index < limit; index++) {
        // const category = `<a href="#"><span id="${array[index].id}" class="category">${array[index].name}</span></a>`;

        // const category = document.createElement('a');
        // category.href = "#";

        const category = document.createElement('p');
        category.setAttribute('id', 'id' + array[index].id);
        category.classList.add('category-label');
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
        moviePreview.setAttribute('data-type', 'movie');
        moviePreview.setAttribute('id', `${movie.id}`);
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
        moviePreview.classList.add('poster-wrapper__img');
        moviePreview.setAttribute('data-type', 'movie');
        moviePreview.setAttribute('alt', movie.title);
        moviePreview.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);

        moviePreview.addEventListener('click', () => {
            location.hash = `#details=${movie.id}-${movie.title}`;
        });

        allMovies.push(moviePreview);
    });

    return allMovies;
}

function makeSeriesContainerX(data) {
    const allSeries = [];
    const series = data.results;

    series.forEach(serie => {
        // let moviePreview = `<img class="poster-container__img" src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}">`;
        let seriePreview = document.createElement('img');
        seriePreview.classList.add('poster-container__img')
        seriePreview.setAttribute('data-type', 'serie');
        seriePreview.setAttribute('id', `${serie.id}`);
        seriePreview.setAttribute('alt', serie.name);
        seriePreview.setAttribute('src', `https://image.tmdb.org/t/p/w300${serie.poster_path}`);

        seriePreview.addEventListener('click', () => {
            location.hash = `#details=${serie.id}-${serie.name}`;
        });

        allSeries.push(seriePreview);
    });

    return allSeries;
}

async function getMovieById(id) {
    const { data: movie } = await api(`movie/${id}`, {
        params: {
            append_to_response: 'videos',
        },
    });

    const movieImgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    headerSection.style.backgroundImage = `
    linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(255,255,255,0) 16%),
    url('${movieImgUrl}')`;

    const videos = movie.videos.results;
    let videoKey;
    videos.forEach(video => {
        if (video.type === 'Trailer') {
            videoKey = video.key;
        }
    });

    const videoUrl = `https://www.youtube.com/watch?v=${videoKey}`;
    trailerBtn.addEventListener('click', () => {
        window.open(videoUrl);
    });

    detailsVote.innerText = `${Math.round(movie.vote_average * 1000) / 100}%`;

    let categoriesList = makeCategoryLabelsContainerLimited(movie.genres, 2);
    detailsCategories.innerHTML = "";
    detailsCategories.append(...categoriesList);

    detailsOverview.innerText = movie.overview;
}

async function getSerieById(id) {
    const { data: serie } = await api(`tv/${id}`, {
        params: {
            append_to_response: 'videos',
        },
    });

    const serieImgUrl = `https://image.tmdb.org/t/p/w500${serie.poster_path}`
    headerSection.style.backgroundImage = `
    linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(255,255,255,0) 16%),
    url('${serieImgUrl}')`

    const videos = serie.videos.results;
    let videoKey;
    try {
        videos.forEach(video => {
            if (video.type === 'Trailer') {
                videoKey = video.key;
            }
        });
    } catch (error) {
        videoKey = videos[0].key;
    }

    const videoUrl = `https://www.youtube.com/watch?v=${videoKey}`;
    trailerBtn.addEventListener('click', () => {
        window.open(videoUrl);
    });

    detailsVote.innerText = `${Math.round(serie.vote_average * 1000) / 100}%`;

    try {
        let categoriesList = makeCategoryLabelsContainerLimited(serie.genres, 2);
        detailsCategories.innerHTML = "";
        detailsCategories.append(...categoriesList);
    } catch (error) {
        let categoriesList = makeCategoryLabelsContainerLimited(serie.genres, 1);
        detailsCategories.innerHTML = "";
        detailsCategories.append(...categoriesList);
    }

    detailsOverview.innerText = serie.overview;
}

async function getMoviesRelated(id) {
    const { data } = await api(`movie/${id}/recommendations`);

    detailsRelatedContent.innerHTML = "";
    detailsRelatedContent.append(...makeMovieContainerX(data));
}

async function getSeriesRelated(id) {
    const { data } = await api(`tv/${id}/recommendations`);

    detailsRelatedContent.innerHTML = "";
    detailsRelatedContent.append(...makeSeriesContainerX(data));
}

async function innerFetch(id) {
    const { data } = await api('/discover/tv', {
        params: {
            with_genres: id,
        },
    });

    return data;
}