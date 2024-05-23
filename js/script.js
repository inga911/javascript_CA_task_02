import { chooseUser, chooseAdmin, user, admin, userType } from "./login.js";
import { createMovie } from "./create.js";
import { appendMovie } from './movieList.js';
import { loadMovieDetails } from './movieDetails.js';

function createToolbarLinks() {
    const toolBar = document.querySelector('.toolbar');
    if (!toolBar) {
        console.error('Toolbar element not found');
        return;
    }

    const goToMovieList = document.createElement('a');
    goToMovieList.className = 'toolbar-link'
    goToMovieList.href = 'movieList.html';
    goToMovieList.innerHTML = 'Go to movie list';

    const logoutDiv = document.createElement('div');
    logoutDiv.className = 'toolbar-link'
    logoutDiv.innerHTML = 'Log out';
    logoutDiv.onclick = () => {
        localStorage.removeItem('userType');
        localStorage.removeItem('user');
        window.location = "index.html"
    }

    const createNewMovie = document.createElement('div');
    if (userType === 'admin') {
        createNewMovie.className = 'toolbar-link'
        createNewMovie.innerHTML = 'Create new movie';
        createNewMovie.onclick = () => {
            window.location = "create.html"
        }
    }

    const currentUser = document.createElement('div');
    currentUser.className = 'current-user'
    currentUser.innerHTML = `${userType === 'user' ? 'Now  logged in as  USER' : 'Now logged in as ADMIN'}`;


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
    loadMovieDetails();
});
