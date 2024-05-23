import { selectSeat } from "./selectSeat.js";
import { userType } from "../login.js";

const modalCancel = document.getElementById('modalCancel')
const closeModalCancel = document.getElementById('closeModalCancel')
const seatsToCancel = document.querySelector('.seatsToCancel')
const closeModal = document.querySelector('.closeModal')



export function appendSeats(seats, movieTitle, movieSeats) {

    const seatContainer = document.getElementById('seatContainer');
    for (let i = 0; i < seats; i++) {
        const seat = document.createElement('div');
        seat.className = 'seat';
        seat.setAttribute('id', `${i}`);
        seat.textContent = `${i + 1}`;
        seatContainer.appendChild(seat);
        selectSeat(seat);
    }
    const availableSeats = document.querySelector('.available-seats')
    // Saving to localStorage and display as reserved
    const reservedSeatsData = JSON.parse(localStorage.getItem('reservedSeatsData')) || {};
    const reservedSeats = reservedSeatsData[movieTitle] || [];
    //Count avaiable  seats and display it
    const count = reservedSeats.length;
    const available = movieSeats - count
    if (availableSeats) {
        availableSeats.innerHTML = `(${available} of ${movieSeats} available seats)`;
    } else {
        console.error('Available seats element not found');
    }

    reservedSeats.forEach(seatId => {
        const seat = document.getElementById(seatId);
        if (seat) {
            seat.classList.add('reserved');
            seat.classList.add('disable');
            //If Admin is logged in can cancel reserved seats
            if (userType === 'admin') {
                if (seat.classList.contains('reserved')) {
                    seat.classList.remove('disable');
                    seat.onclick = () => {
                        modalCancel.showModal();
                        seatsToCancel.innerHTML = `Are you sure you want to cancel reservation of ${seat.textContent} seat?`
                        //Closing modal with confirmation of canceling and removing that seat from localStorage
                        closeModalCancel.onclick = () => {
                            const index = reservedSeats.indexOf(seatId);
                            //If seat exist in reservedSeats, remove it from here
                            if (index > -1) {
                                reservedSeats.splice(index, 1)
                                //Updating currentt movie data 
                                reservedSeatsData[movieTitle] = reservedSeats
                                localStorage.setItem('reservedSeatsData', JSON.stringify(reservedSeatsData))
                                //Enable to reserve this seat again
                                seat.classList.remove('reserved', 'disable');
                                seat.onclick = null;
                                location.reload()
                            }
                            modalCancel.close()
                        }
                    }
                }
            }
        }
    });
}
//Close modal if do not want to cancel reservation
if (closeModal) {
    closeModal.onclick = () => {
        modalCancel.close()
    }
}