import './styles.css';
import PicApiService from './js/pic-api-service';
import LoadMoreBtn from './js/load-more-btn';
import imageCardTpl from './templates/image-card.hbs';
import Pnotify from '../node_modules/pnotify/dist/es/PNotify';
import '../node_modules/pnotify/dist/PNotifyBrightTheme.css';
import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

// REFS
const refs = {
    searchForm: document.querySelector('#search-form'),
    imageCardList: document.querySelector('.gallery'),
    header: document.querySelector('.header'),
    gallery: document.querySelector('.gallery'),
}

// CLASSES
const picApiService = new PicApiService;
const loadMoreBtn = new LoadMoreBtn;

// LISTENERS
refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.button.addEventListener('click', loadMore);
refs.gallery.addEventListener('click', openModal);

// FUNCTIONS
function onSearch(event) {
    event.preventDefault();
    picApiService.query = event.currentTarget.elements.query.value; 

    if(picApiService.query === '') {
        Pnotify.error('please, put in input something good :3');
        return;
    }

    picApiService.resetPage();
    loadMoreBtn.loading();
    clearImageCardList();
    render();
}

function loadMore() {
    loadMoreBtn.loading();
    render();
}

function render() {
    picApiService.fetchArticles()
    .then(hits => {
        appendImageCardMarkup(hits);
        if(!picApiService.totalHits) throw new Error;
        if(picApiService.totalHits <= (picApiService.pageNumber - 1) * 12) {
            loadMoreBtn.hidespinner();
        } else {
            loadMoreBtn.loaded();
        }
        scrollGallery(picApiService.pageNumber);
    })
    .catch(() => {
        Pnotify.error({
            title: 'please, put in input something good :3',
        })
        loadMoreBtn.hidespinner();
    });
}

function appendImageCardMarkup(hits) {
    refs.imageCardList.insertAdjacentHTML('beforeend', imageCardTpl(hits));
}

function clearImageCardList() {
    refs.imageCardList.innerHTML = '';
}

function scrollGallery(page) {
    window.scrollTo({
        top: (refs.imageCardList.clientHeight / page) * (page - 1) + refs.header.clientHeight, 
        behavior: "smooth"
    })
}

function openModal(event) {
    if(event.target.nodeName !== 'IMG') return;
    const instance = basicLightbox.create(`
    <img src="${event.target.dataset.source}" width="800" height="600">`)

    instance.show()
}
