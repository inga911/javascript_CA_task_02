export function selectSeat(seat) {
    seat.onclick = () => {
        seat.classList.toggle('selected');
        const seatId = seat.id;
        let userSelectedSeats = JSON.parse(localStorage.getItem('userSelectedSeats')) || [];

        if (seat.classList.contains('selected')) {
            userSelectedSeats.push(seatId);
        } else {
            const index = userSelectedSeats.indexOf(seatId);
            if (index > -1) {
                userSelectedSeats.splice(index, 1);
            }
        }

        localStorage.setItem('userSelectedSeats', JSON.stringify(userSelectedSeats));
    };
}