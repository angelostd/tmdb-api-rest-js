import * as main from './main.js';

let previousHash = '#home';

searchHomeBtn.addEventListener('click', () => {
    previousHash = location.hash;
    location.hash = '#search=';
});

arrowToHome.addEventListener('click', () => {
    previousHash = location.hash;
    location.hash = '#home';
});

headerShowMoreInfo.addEventListener('click', () => {
    previousHash = location.hash;
    location.hash = '#details=';
});

arrowBtn.addEventListener('click', () => {
    previousHash = location.hash;
    location.hash = '#home';
});

arrowBack.addEventListener('click', () => {
    previousHash = location.hash;
    location.hash = '#home';
});

window.addEventListener('load', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#details=')) {
        detailsPage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    }
}

function homePage() {
    // => Removing classes
    headerSection.classList.remove('hero-details');
    headerSection.classList.remove('hidden');
    // headerSection.style.backgroundImage = '';
    myListPreviewSection.classList.remove('hidden');
    trendingPreviewSection.classList.remove('hidden');
    categoriesPreviewSection.classList.remove('hidden');
    randomPreviewSection.classList.remove('hidden');
    topRatedPreviewSection.classList.remove('hidden');
    footerSection.classList.remove('hidden');
    headerNavigationbar.classList.remove('hidden');
    headerInformation.classList.remove('hidden');
    mainSection.classList.remove('main--details');

    // => Adding classes
    arrowBtn.classList.add('hidden');
    detailsSection.classList.add('hidden');
    categorySection.classList.add('hidden');
    searchSection.classList.add('hidden');

    // => Api requests
    main.getTrendingMoviesPreview();
    main.getTopRatedMoviesPreview();
    main.getCategoriesPreview();
    main.getRandomSeries();
}

function categoriesPage() {
    console.log('CATegory');
    // => Removing classes
    headerSection.classList.add('hidden');
    arrowBtn.classList.remove('hidden');
    categorySection.classList.remove('hidden');
    mainSection.classList.remove('main--details');

    // => Adding classes
    myListPreviewSection.classList.add('hidden');
    trendingPreviewSection.classList.add('hidden');
    categoriesPreviewSection.classList.add('hidden');
    randomPreviewSection.classList.add('hidden');
    topRatedPreviewSection.classList.add('hidden');
    footerSection.classList.add('hidden');
    detailsSection.classList.add('hidden');
    searchSection.classList.add('hidden');

    // => Api requests
    const [urlPage, categoryData] = location.hash.split('=');
    const [id, name] = categoryData.split('-');
    categoryTitle.innerHTML = name;
    main.getMoviesByCategory(id);
}

function searchPage() {
    // => Removing classes
    headerSection.classList.add('hidden');
    arrowBtn.classList.remove('hidden');
    searchSection.classList.remove('hidden');
    mainSection.classList.remove('main--details');

    // => Adding classes
    myListPreviewSection.classList.add('hidden');
    trendingPreviewSection.classList.add('hidden');
    categoriesPreviewSection.classList.add('hidden');
    randomPreviewSection.classList.add('hidden');
    topRatedPreviewSection.classList.add('hidden');
    footerSection.classList.add('hidden');
    detailsSection.classList.add('hidden');
    categorySection.classList.add('hidden');
}

function detailsPage() {
    console.log('detailing details detaliced');
    // => Removing classes
    headerSection.classList.remove('hidden');
    arrowBtn.classList.remove('hidden');
    detailsSection.classList.remove('hidden');
    footerSection.classList.remove('hidden');

    // => Adding classes
    mainSection.classList.add('main--details');
    headerSection.classList.add('hero-details');
    myListPreviewSection.classList.add('hidden');
    trendingPreviewSection.classList.add('hidden');
    categoriesPreviewSection.classList.add('hidden');
    randomPreviewSection.classList.add('hidden');
    topRatedPreviewSection.classList.add('hidden');
    categorySection.classList.add('hidden');
    searchSection.classList.add('hidden');
    headerNavigationbar.classList.add('hidden');
    headerInformation.classList.add('hidden');
}

// aux nav fn
function returnBack() {
    let aux;
    aux = previousHash;
    console.log(aux);
    previousHash = location.hash;
    console.log(previousHash);
    location.hash = aux;
}