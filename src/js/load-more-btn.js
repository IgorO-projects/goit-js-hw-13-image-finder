export default class LoadMoreBtn {
    constructor() {
        this.spinner = document.querySelector('.spinner');
        this.button = document.querySelector('.js-btn-load-more');
    }

    loading() {
        this.spinner.classList.remove('is-hidden');
        this.button.classList.add('is-hidden');
    }

    loaded() {
        this.spinner.classList.add('is-hidden');
        this.button.classList.remove('is-hidden');
    }
    hideBtn() {
        this.button.classList.add('is-hidden');
    }
    hidespinner() {
        this.spinner.classList.add('is-hidden');
    }
}   