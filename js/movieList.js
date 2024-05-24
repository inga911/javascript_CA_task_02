import { userType } from "./login.js";
import { getAvailableSeats } from "./movie-details/appendSeats.js";

export function appendMovie() {
  const movies = JSON.parse(localStorage.getItem('movies')) || [];
  const mainList = document.getElementById('mainList');
  const movieCountElement = document.querySelector('.movie-count');

  if (!mainList) {
    return;
  }

  if (movieCountElement) {
    movieCountElement.textContent = `(${movies.length})`;
  }

  movies.forEach((movie, index) => {
    const movieBox = document.createElement('div');
    movieBox.classList.add('movie-box');
    movieBox.innerHTML = `
          <div class="movie-box--img">
            <img src="${movie.url}" alt="" class="main-movie-img"/>
          </div>
          <div class="movie-box--details">
            <div class="movie-title"><span class="title">${movie.title}</span></div>
            <div class="movie-title">Seats <span class="seats"></span></div>
            ${userType === 'admin' ? `<button class="movie-box--details__delete-btn" data-index="${index}">Delete</button>` : ''}
          </div>
        `;

    //after clicking the image redirects to one page of the movie
    const movieImgBox = movieBox.querySelector('.movie-box--img')
    movieImgBox.addEventListener('click', () => {
      localStorage.setItem('currentMovie', JSON.stringify(movie));
      window.location.href = 'moviePage.html';
    });
    //Available and total seats
    const reservedSeatsData = JSON.parse(localStorage.getItem('reservedSeatsData')) || {};
    const seats = movieBox.querySelector('.seats')
    const reservedSeats = reservedSeatsData[movie.title] || [];
    seats.innerHTML = ``
    getAvailableSeats(seats, reservedSeats, movie.seats)

    mainList.appendChild(movieBox);
  });

  //If user is ADMIN show delete button and let delete movie
  if (userType === 'admin') {
    const deleteBtns = document.querySelectorAll('.movie-box--delete-btn');
    deleteBtns.forEach(btn => {
      btn.onclick = () => {
        const btnIndex = btn.getAttribute('data-index');
        movies.splice(btnIndex, 1);
        localStorage.setItem('movies', JSON.stringify(movies));
        window.location.reload();
      };
    });
  }
}

