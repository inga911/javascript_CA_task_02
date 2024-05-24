import { userType } from "../login.js";
import { appendSeats } from "../movie-details/appendSeats.js";

export function appendMovieDetails() {
  const singlePage = document.getElementById('singlePage');
  const currentMovie = JSON.parse(localStorage.getItem('currentMovie'));
  const movieTitle = currentMovie.title;
  const movieSeats = currentMovie.seats
  if (!singlePage) {
    return;
  }

  const mainSinglePage = document.createElement('div');
  mainSinglePage.className = 'main-single-page';
  mainSinglePage.innerHTML = `
    <div class="main-single-page--img">
      <img src="${currentMovie.url}" alt="" class="main-movie-img"/>
    </div>
    <div class="main-single-page--left-side">
      <div class="main-single-page--left-side__title">${currentMovie.title} <span class="available-seats"> </span></div>
      <div class="main-single-page--left-side__select-seats">
        <div class="screen">Screen</div>
        <div class="seats d-flex justify-content-center flex-wrap gap-3" id="seatContainer">
        </div>
      </div>
      <div class="reservation-info">
        <div>available <div class="res-box available"></div></div>
        <div>selected <div class="res-box selected"></div></div>
        <div>reserved <div class="res-box reserved"></div></div>
      </div>
      <div class="cancel-info">${userType === 'admin' ? '*Click on reserved seat if want to cancel reservation' : ''}</div>
      <div class="buttons">
        <button class="reservation">Reserve Seat</button>
       
      </div>
    </div>
  `;

  singlePage.appendChild(mainSinglePage);
  appendSeats(currentMovie.seats, movieTitle, movieSeats);
}
