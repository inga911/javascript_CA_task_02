import { userType } from "./login.js";

export function appendMovie() {
  const movies = JSON.parse(localStorage.getItem('movies')) || [];
  const mainList = document.getElementById('mainList');
  const movieCountElement = document.querySelector('.movie-count');

  if (!mainList) {
    console.error('Main list element not found');
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
            <div class="movie-title">Seats <span class="seats">${movie.seats}</span></div>
            ${userType === 'admin' ? `<button class="movie-box--delete-btn" data-index="${index}">Delete</button>` : ''}
          </div>
        `;

    const movieImgBox = movieBox.querySelector('.movie-box--img')
    movieImgBox.addEventListener('click', () => {
      localStorage.setItem('currentMovie', JSON.stringify(movie));
      window.location.href = 'moviePage.html';
    });

    mainList.appendChild(movieBox);
  });

  if (userType === 'admin') {
    const deleteBtns = document.querySelectorAll('.movie-box--delete-btn');
    deleteBtns.forEach(btn => {
      btn.onclick = () => {
        const btnIndex = btn.getAttribute('data-index');
        movies.splice(btnIndex, 1);
        localStorage.setItem('movies', JSON.stringify(movies));
        window.location.reload();
        console.log('delete btn');
      };
    });
  }
}
