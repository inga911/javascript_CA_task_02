export const user = document.querySelector('.user')
export const admin = document.querySelector('.admin')
export const userType = localStorage.getItem('userType')
const mainLogin = document.querySelector('.main-login')
const adminModal = document.querySelector('.admin-modal')
const toMovieList = document.querySelector('.movie-list')
const toCreateMovie = document.querySelector('.movie-create')

export function chooseUser(user) {
    if (user) {
        user.onclick = () => {
            localStorage.setItem('userType', 'user');
            setTimeout(() => {
                window.location = "movieList.html";
            }, 200)
        }
    }
}

export function chooseAdmin() {
    if (admin) {
        admin.onclick = () => {
            localStorage.setItem('userType', 'admin');
            setTimeout(() => {
                mainLogin.classList.add('d-none')
                adminModal.classList.remove('d-none')
                if (toMovieList) {
                    goToMovieList()
                }
                if (toCreateMovie) {
                    goToCreateMovie()
                }
            }, 200)
        }
    }
}

function goToMovieList() {
    toMovieList.onclick = () => {
        setTimeout(() => {
            window.location = "movieList.html";
        }, 200)
    }
}

function goToCreateMovie() {
    toCreateMovie.onclick = () => {
        setTimeout(() => {
            window.location = "create.html";
        }, 200)
    }
}