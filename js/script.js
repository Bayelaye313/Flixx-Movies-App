//introduction router manip
const global = {
    currentPage : window.location.pathname,
}
//highlighting links
function highlightLinks() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link)=>{
        const path = link.getAttribute('href');
        if (path == global.currentPage) {
            link.classList.add('active');
        }

    });
}
//fetching function
async function FetchingApiData(endpoint) {
    const API_KEY = '79dec438c9f9294ccb47ab53bb4ed955';
    const API_URL = 'https://api.themoviedb.org/3/';
    showSpinner()
    const res = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language= en-US`)
    const data = await res.json()
    hiddenSpinner()
    return data   
}
//recuperation movies details
async function responsePopularMovies() {
    const {results} = await FetchingApiData('movie/popular');
    results.forEach((movie)=>{
        const div = document.createElement('div');
        div.classList.add(".card");

        div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
        ${
            movie.poster_path ? `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />
            ` : 
            `<img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="${movie.title}"
          />
            `
        }
        </a>
        <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
        </div>
        `
        document.querySelector('#popular-movies').appendChild(div);
    })  
}
//recuperation tv shows details

async function responsePopularShows() {
    const {results} = await FetchingApiData('tv/popular');
    console.log(results)
    results.forEach((shows)=>{
        const div = document.createElement('div');
        div.classList.add(".card");

        div.innerHTML = `
        <a href="tv-details.html?id=${shows.id}">
        ${
            shows.poster_path ? `<img
            src="https://image.tmdb.org/t/p/w300${shows.poster_path}"
            class="card-img-top"
            alt="${shows.name}"
          />
            ` : 
            `<img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="${shows.name}"
          />
            `
        }
        </a>
        <div class="card-body">
            <h5 class="card-title">${shows.name}</h5>
            <p class="card-text">
            <small class="text-muted">Aired: ${shows.first_air_date}</small>
            </p>
        </div>
        `
        document.querySelector('#popular-shows').appendChild(div);
    })  

}
//show spinner
function showSpinner() {
    document.querySelector(".spinner").classList.add('show')
}
//hidden spinner
function hiddenSpinner() {
    document.querySelector(".spinner").classList.remove('show')

}

//init
function init() {
    switch (global.currentPage) {
        case "/":
        case "index.html":
            responsePopularMovies();            
            break;
        case "/shows.html":
            responsePopularShows();           
            break;
        case "/tv-details.html":
            console.log("tv-details Page")
            break;
        case "/movie-details.html":
            console.log("movie-details Page")
            break;        
           

    }
    highlightLinks();
}
document.addEventListener('DOMContentLoaded', init);
