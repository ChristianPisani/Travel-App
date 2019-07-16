import { unsplashAccessToken as accessToken } from './Keys';

export default class UnsplashAPI {
    async fetchCityImage(city) {
        return fetch("https://api.unsplash.com/search/photos?page=1&query=" + city, {
            headers: {
                Authorization: accessToken
            }
        })
            .then(response => response.json())
            .then(response => {
                return response.results[0].urls.regular;
            })
            .catch(error => {
                return "";
            });
    }

    async fetchCityImages(city) {
        return fetch("https://api.unsplash.com/search/photos?page=1&query=" + city, {
            headers: {
                Authorization: accessToken
            }
        })
            .then(response => response.json())
            .then(response => {
                //console.log(response);
                return response.results;
            })
            .catch(error => {
                return "";
            });
    }
}