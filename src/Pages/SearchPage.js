import React, { Component } from 'react';

import SabreApi from '../API/Sabre';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const sabreApi = new SabreApi();

const defaultCountry = "NO";


export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            countrySelect: [<option value="NO" selected="selected">Norway</option>],
            startDate: new Date()
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

    pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    formatDate(date) {
        return `${date.getFullYear()}-${this.pad(date.getMonth() + 1, 2)}-${this.pad(date.getDate(), 2)}`;
    }

    doSearch = () => {
        const searchInput = document.getElementById("searchInput");
        const query = searchInput.value;
        const { startDate } = this.state;

        if (query) {
            this.setState({ loading: true });

            //const pointOfSaleCountrySelector = document.getElementById("pointOfSaleCountrySelector");
            //const searchButton = document.getElementById("searchButton");
            //const pointOfSaleCountry = pointOfSaleCountrySelector.value;
            const pointOfSaleCountry = "no";

            searchInput.classList.add("shrinkX");

            console.log(this.formatDate(startDate));
            this.props.redirect("/search/" + query + "/" + this.formatDate(startDate));

            /*this.props.fetchLocations(query, pointOfSaleCountry)
                .then((destinations) => {
                    this.setState({ loading: false });
     
                    if (destinations.length > 0) {
                        this.props.redirect("/search/" + query);
                    }
                })*/
        }
    }

    handleDateChange(date) {
        this.setState({
            startDate: date
        });
    }

    render() {
        return (
            <div className="searchPage" >
                <div className="searchContainer">
                    <div className="searchInputWrapper">
                        <input id="searchInput" className={"searchInput animatable_short" + (this.props.error ? " error" : "")} placeholder="Search" />
                        <button id="searchButton" className="searchButton plane animatable_medium" onClick={this.doSearch}>
                            <FontAwesomeIcon icon="plane" color="green" />
                        </button>
                    </div>

                    <div className="travel-datepicker">
                        <DatePicker
                            id="search-date"
                            selected={this.state.startDate}
                            onChange={(date) => this.handleDateChange(date)}>
                        </DatePicker>
                    </div>

                </div>
                <p style={{ color: "darkred" }}>{this.props.error ? "Ingen resultater" : ""}</p>
                <div id="searchLoader" className={this.state.loading ? "loader" : "loader hidden"} />

                {/*<select id="pointOfSaleCountrySelector">
                    {this.state.countrySelect}
                </select>*/}


            </div>
        );
    }
}