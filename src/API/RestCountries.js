export default class RestCountriesAPI {
    async fetchCountries() {
        return fetch("https://restcountries.eu/rest/v2/all?fields=name")
            .then(res => res.json())
            .then(res => {
                return res;
            });
    }
}