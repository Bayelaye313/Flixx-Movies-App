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

//display Movie details
async function displayMovieDetails() {
    const getId = window.location.search.split("=")[1];
    const movie = await FetchingApiData(`movie/${getId}`);
    console.log(movie)
    displayBackgroundDetails('movie', movie.backdrop_path);
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="details-top">
    <div>
        ${movie.poster_path ? `<img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
        />
        `:`<img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="${movie.title}"
      />`}
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>${movie.overview}</p>
      <h5>Genres</h5>
      <ul class="list-group">
      ${movie.genres.map((genre)=>`<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
      <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
      <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${movie.production_companies.map((company)=> `<span>${company.name}</span>`).join(', ')}</div>
  </div>
`
    document.querySelector('#movie-details').appendChild(div);
    
}

// display tv shows details
async function displayShowDetails() {
    const showId = window.location.search.split('=')[1];
  
    const show = await FetchingApiData(`tv/${showId}`);
  
    // Overlay for background image
    displayBackgroundDetails('tv', show.backdrop_path);
  
    const div = document.createElement('div');
  
    div.innerHTML = `
    <div class="details-top">
    <div>
    ${
      show.poster_path
        ? `<img
      src="https://image.tmdb.org/t/p/w500${show.poster_path}"
      class="card-img-top"
      alt="${show.name}"
    />`
        : `<img
    src="../images/no-image.jpg"
    class="card-img-top"
    alt="${show.name}"
  />`
    }
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
      <p>
        ${show.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${
        show.homepage
      }" target="_blank" class="btn">Visit show Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">Number of Episodes:</span> ${
        show.number_of_episodes
      }</li>
      <li><span class="text-secondary">Last Episode To Air:</span> ${
        show.last_episode_to_air.name
      }</li>
      <li><span class="text-secondary">Status:</span> ${show.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
      ${show.production_companies
        .map((company) => `<span>${company.name}</span>`)
        .join(', ')}
    </div>
  </div>
    `;
  
    document.querySelector('#show-details').appendChild(div);
  }
//show spinner
function showSpinner() {
    document.querySelector(".spinner").classList.add('show')
}
//hidden spinner
function hiddenSpinner() {
    document.querySelector(".spinner").classList.remove('show')

}

//function add commas to numbers
function addCommasToNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//display backdrop details pages

function displayBackgroundDetails(type, backgroundImg) {
    const overlay = document.createElement("div");
    overlay.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${backgroundImg})`;
    overlay.style.backgroundPosition = 'center';
    overlay.style.backgroundRepeat = 'no-repeat';
    overlay.style.backgroundSize = 'cover';
    overlay.style.position = 'absolute';
    overlay.style.zIndex = '-1'
    overlay.style.opacity = '0.3'
    overlay.style.left = '0';
    overlay.style.top = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh'

    if (type === 'movie') {
        document.querySelector("#movie-details").appendChild(overlay);
    } else {
        document.querySelector("#show-details").appendChild(overlay);
    }

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
            displayShowDetails();
            break;
        case "/movie-details.html":
            displayMovieDetails()
            break;        
           

    }
    highlightLinks();
}
document.addEventListener('DOMContentLoaded', init);
