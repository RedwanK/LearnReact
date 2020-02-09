//API/api_conf.js  

const API_TOKEN = "c2dc6efc3417063d4feacb6d484a961f";

export function searchFilmsFromAPI(text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key='+API_TOKEN+'&language=fr&query='+text+'&page='+page;

    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error));
}

export function getImageFromAPI(imageName) {
    return 'https://image.tmdb.org/t/p/w300'+imageName;
}

export function getFilmDetail(id) {
    const url = 'https://api.themoviedb.org/3/movie/'+id+'?api_key='+API_TOKEN+'&language=fr';

    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error));
}