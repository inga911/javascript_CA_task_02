export function selectSeat(seat) {
    seat.onclick = () => {
        seat.classList.toggle('selected');
    };
}