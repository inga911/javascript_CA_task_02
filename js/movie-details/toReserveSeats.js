import { userType } from "../login.js";


export function toReserveSeats() {
    const reservationBtn = document.querySelector('.reservation');
    if (reservationBtn) {
        reservationBtn.onclick = () => {
            //Get seats selected by the user
            let userSelectedSeats = JSON.parse(localStorage.getItem('userSelectedSeats')) || [];

            const currentMovie = JSON.parse(localStorage.getItem('currentMovie'));
            const movieTitle = currentMovie.title;
            // Get reserved seats data of all movies
            let reservedSeatsData = JSON.parse(localStorage.getItem('reservedSeatsData')) || {};
            let reservedSeats = reservedSeatsData[movieTitle] || [];
            // Combine the reserved seats
            reservedSeats = reservedSeats.concat(userSelectedSeats);
            // Remove duplicates
            reservedSeats = [...new Set(reservedSeats)];
            reservedSeatsData[movieTitle] = reservedSeats;
            localStorage.setItem('reservedSeatsData', JSON.stringify(reservedSeatsData));
            localStorage.removeItem('userSelectedSeats');
            // to reflect the new reserved seats
            reservedSeats.forEach(seatId => {
                const seat = document.getElementById(seatId);
                if (seat) {
                    seat.classList.remove('selected');
                    seat.classList.add('reserved');
                    seat.classList.add('disable');
                    if (userType === 'admin') {
                        seat.classList.remove('disable');
                    }
                }
            });
            location.reload()
        };
    }
}
