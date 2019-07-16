export default class RestCountriesAPI {
    async fetchCountries() {
        return fetch("https://restcountries.eu/rest/v2/all?fields=name")
            .then(res => res.json())
            .then(res => {
                console.log(res);
                return res;
            });
    }

    async fetchCountryFromCode(code) {
        return fetch("https://restcountries.eu/rest/v2/alpha?codes=" + code)
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                return res;
            });
    }
}