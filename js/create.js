import { innerModalTxt, modal } from "./modal.js"

const movieTitle = document.getElementById('movieTitle')
const movieURL = document.getElementById('movieURL')
const movieSeats = document.getElementById('movieSeats')
const createMovieBtn = document.querySelector('.create-movie-btn')
const closeModalYes = document.getElementById('closeModalYes')


function isValidSeats(seats) {
    const parsedSeats = parseInt(seats, 10);
    return Number.isInteger(parsedSeats) && parsedSeats > 0 && parsedSeats <= 100;
}
function isValidImageUrl(url) {
    return (url.startsWith('http://') || url.startsWith('https://'));
}

export function createMovie() {
    if (createMovieBtn) {
        createMovieBtn.onclick = () => {
            const title = movieTitle.value;
            const url = movieURL.value;
            const seats = movieSeats.value;
            if (!isValidSeats(seats)) {
                innerModalTxt('Info', `Please enter a valid number of seats between 1 and 100`);
                return;
            }
            if (!isValidImageUrl(url)) {
                innerModalTxt('Info', `Please enter a valid image URL`);
                return;
            }
            if (title && url && seats) {
                if (seats > 100) {
                    innerModalTxt('Info', `Please enter seats between 1 and 100`)
                    return
                } else if (seats <= 0) {
                    innerModalTxt('Info', `Please enter seats between 1 and 100`)
                    return
                }
                const movies = JSON.parse(localStorage.getItem('movies')) || [];

                const movie = {
                    title,
                    url,
                    seats
                };

                movies.push(movie);

                localStorage.setItem('movies', JSON.stringify(movies));
                window.location = 'movieList.html'
            } else {
                innerModalTxt('Info', `Please  fill out all fields`)
            }

        }

    }
    if (closeModalYes) {
        closeModalYes.onclick = () => {
            modal.close();
        };
    }
}
