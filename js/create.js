const movieTitle = document.getElementById('movieTitle')
const movieURL = document.getElementById('movieURL')
const movieSeats = document.getElementById('movieSeats')
const createMovieBtn = document.querySelector('.create-movie-btn')

export function createMovie() {
    if (createMovieBtn) {
        createMovieBtn.onclick = () => {
            const title = movieTitle.value;
            const url = movieURL.value;
            const seats = movieSeats.value;

            if (title && url && seats) {
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
                alert('Please fill in all fields');
            }

        }
    }
}