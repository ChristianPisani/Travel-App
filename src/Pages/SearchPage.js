import React, { Component } from 'react';

import SabreApi from '../API/Sabre';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const sabreApi = new SabreApi();

const defaultCountry = "NO";


export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            countrySelect: [<option value="NO" selected="selected">Norway</option>]
        }

        const countries = sabreApi.getPointOfSaleCountries()
            .then(countries => {
                if (countries.Countries) {
                    const countriesMap = countries.Countries.map(country => {
                        if (country.CountryCode === defaultCountry) {
                            return <option value={country.CountryCode} selected="selected">{country.CountryName}</option>
                        } else {
                            return <option value={country.CountryCode}>{country.CountryName}</option>
                        }
                    });
                    this.setState({ countrySelect: countriesMap });
                }
            });
    }

    doSearch = () => {
        const searchInput = document.getElementById("searchInput");
        const query = searchInput.value;

        if (query) {
            this.setState({ loading: true });

            const pointOfSaleCountrySelector = document.getElementById("pointOfSaleCountrySelector");
            const searchButton = document.getElementById("searchButton");
            const pointOfSaleCountry = pointOfSaleCountrySelector.value;

            searchInput.classList.add("shrinkX");

            this.props.redirect("/search/" + query);

            /*this.props.fetchLocations(query, pointOfSaleCountry)
                .then((destinations) => {
                    this.setState({ loading: false });
    
                    if (destinations.length > 0) {
                        this.props.redirect("/search/" + query);
                    }
                })*/
        }
    }

    render() {
        return (
            <div className="searchPage" >
                <div className="searchContainer">
                    <input id="searchInput" className={"searchInput animatable_short" + (this.props.error ? " error" : "")} placeholder="Search" />
                    <button id="searchButton" className="searchButton plane animatable_medium" onClick={this.doSearch}>
                        <FontAwesomeIcon icon="plane" color="green" />
                    </button>

                </div>
                <p style={{ color: "darkred" }}>{this.props.error ? "Ingen resultater" : ""}</p>
                <div id="searchLoader" className={this.state.loading ? "loader" : "loader hidden"} />

                <select id="pointOfSaleCountrySelector">
                    {this.state.countrySelect}
                </select>
            </div>
        );
    }
}