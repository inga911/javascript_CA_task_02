export const modal = document.getElementById('modal')
export const modalDescription = document.querySelector('.modal-description')
export const modalTitle = document.querySelector('.modal-title')
export const closeModalYes = document.querySelector('.closeModalYes')


export function innerModalTxt(title, description) {
    modal.showModal();
    modalTitle.innerHTML = `${title}`
    modalDescription.innerHTML = `${description}`
}