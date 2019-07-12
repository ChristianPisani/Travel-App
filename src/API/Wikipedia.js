export default class WikipediaAPI {
    async fetchWiki(searchTerm) {
        const url = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=";

        return fetch(encodeURI(url + searchTerm))
            .then(response => response.json())
            .then(response => {
                const responseText = response[2][0];
                return responseText;
            })
            .catch(error => {
                return "";
            });
    }
}

