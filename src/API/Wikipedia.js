export default class WikipediaAPI {
    async fetchWiki(searchTerm) {
        const url = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=";

        return fetch(encodeURI(url + searchTerm))
            .then(response => response.json())
            .then(response => {
                console.log(response);
                const responseText = response[2][0];
                return responseText;
            })
            .catch(error => {
                return "";
            });
    }

    async fetchWikiText(searchTerm) {
        const url = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=max&exintro&format=json&titles=";

        return fetch(encodeURI(url + searchTerm))
            .then(response => response.json())
            .then(response => {
                console.log(response);
                const pages = response.query.pages;
                const responseText = pages[Object.keys(pages)[0]].extract;
                console.log(responseText);
                return responseText;
            })
            .catch(error => {
                return "";
            });
    }
}

