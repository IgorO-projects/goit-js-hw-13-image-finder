import './styles.css';
import PicApiService from './js/pic-api-service';
import imageCardTpl from './templates/image-card.hbs';

const refs = {
    searchForm: document.querySelector('#search-form'),
    loadMoreBtn: document.querySelector('.js-btn-load-more'),
    imageCardList: document.querySelector('.gallery'),
}

// main js 
const picApiService = new PicApiService;

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', loadMore);

function onSearch (event) {
    event.preventDefault();
    picApiService.query = event.currentTarget.elements.query.value; 
    picApiService.resetPage();

    picApiService.fetchArticles().then(hits => {
        clearImageCardList();
        appendImageCardMarkup(hits);
    });
}

function loadMore () {
    picApiService.fetchArticles().then(appendImageCardMarkup);
}

function appendImageCardMarkup(hits) {
    refs.imageCardList.insertAdjacentHTML('beforeend', imageCardTpl(hits));
}

function clearImageCardList () {
    refs.imageCardList.innerHTML = '';
}