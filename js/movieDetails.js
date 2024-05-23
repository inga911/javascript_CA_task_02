import { userType } from "./login.js";

export function loadMovieDetails() {
    const singlePage = document.getElementById('singlePage');
    const currentMovie = JSON.parse(localStorage.getItem('currentMovie'));

    const mainSinglePage = document.createElement('div');
    mainSinglePage.className = 'main-single-page';
    mainSinglePage.innerHTML = `
      <div class="main-single-page--img">
        <img src="${currentMovie.url}" alt="" class="main-movie-img"/>
      </div>
      <div class="main-single-page--left-side">
        <div class="main-single-page--left-side__title">${currentMovie.title}</div>
        <div class="main-single-page--left-side__select-seats">
          <div class="screen">Screen</div>
          <div class="seats d-flex flex-wrap gap-3" id="seatContainer">
          </div>
        </div>
        <div class="buttons">
          <button class="reserve-btn">Reserve Seat</button>
          ${userType === 'admin' ? '<button class="cancel-btn">Cancel reservation</button>' : ''}
        </div>
      </div>
    `;

    singlePage.appendChild(mainSinglePage);
    appendSeats(currentMovie.seats);
}

function appendSeats(seatCount) {
    const seatContainer = document.getElementById('seatContainer');
    for (let i = 0; i < seatCount; i++) {
        const seat = document.createElement('div');
        seat.className = 'seat';
        seat.textContent = `${i + 1}`;
        seatContainer.appendChild(seat);
    }
}
