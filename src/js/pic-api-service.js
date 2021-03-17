const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '20714819-0852724b96f75a6ed867164b1';

export default class PicApiService {
    constructor() {
        this.searchQuery = '';
        this.pageNumber = 1;
    }

    fetchArticles() {
        const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.pageNumber}&per_page=12&key=${API_KEY}`; 

        return fetch(url)
        .then(response => response.json())
        .then(data => {
            this.incrementPage();
            return data.hits;
        }); 
    }

    incrementPage() {
        this.pageNumber += 1;
    }
    resetPage() {
        this.pageNumber = 1;
    }

    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }

}