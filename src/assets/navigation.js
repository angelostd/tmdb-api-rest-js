import * as main from './main.js';

window.addEventListener('load', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    console.log({ location });

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
    console.log('Home c:');
    main.getTrendingMoviesPreview();
    main.getTopRatedMoviesPreview();
    main.getCategoriesPreview();
    main.getRandomSeries();
}
function categoriesPage() {
    console.log('catcatecategory');
}
function searchPage() {
    console.log('searching wfinuyoetrsf');
}
function detailsPage() {
    console.log('detailing details detaliced');
}