import { chooseUser, chooseAdmin, user, admin, userType } from "./login.js";
import { createMovie } from "./create.js";
import { appendMovie } from './movieList.js';
import { appendMovieDetails } from './movie-details/movieDetails.js';
import { toReserveSeats } from "./movie-details/toReserveSeats.js";

function createToolbarLinks() {
    const toolBar = document.querySelector('.toolbar');
    if (!toolBar) {
        console.error('Toolbar element not found');
        return;
    }

    const goToMovieList = document.createElement('a');
    goToMovieList.className = 'toolbar-link list'
    goToMovieList.href = 'movieList.html';
    goToMovieList.innerHTML = 'Movie list';

    const logoutDiv = document.createElement('div');
    logoutDiv.className = 'toolbar-link current-user'
    logoutDiv.innerHTML = 'Log out';
    logoutDiv.onclick = () => {
        localStorage.removeItem('userType');
        localStorage.removeItem('user');
        window.location = "index.html"
    }

    const createNewMovie = document.createElement('div');
    if (userType === 'admin') {
        createNewMovie.className = 'toolbar-link new'
        createNewMovie.innerHTML = '<span class="material-symbols-outlined">add</span> new movie';
        createNewMovie.onclick = () => {
            window.location = "create.html"
        }
    }

    const currentUser = document.createElement('div');
    currentUser.className = 'current-user'
    currentUser.innerHTML = `${userType === 'user' ? '<span class="material-symbols-outlined"> person</span>  USER' : '<span class="material-symbols-outlined"> person</span> ADMIN'}`;


    toolBar.appendChild(goToMovieList);
    toolBar.appendChild(createNewMovie);
    toolBar.appendChild(logoutDiv);
    toolBar.appendChild(currentUser);
}
createToolbarLinks();

document.addEventListener('DOMContentLoaded', () => {
    chooseUser(user);
    chooseAdmin(admin);
    createMovie();
    appendMovie();
    appendMovieDetails();
    toReserveSeats()
});
