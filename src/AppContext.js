import React, { Component } from 'react';
import ShowCase from "./Components/ShowCase";

import SabreAPI from './API/Sabre.js';

export const AppContext = React.createContext();

const sabreAPI = new SabreAPI();

export class AppProvider extends Component {
    state = {
        search: '',
        loading: false,
        searchHits: [],
        name: "Travelicious App",
        countries: []
    }

    async fetchAndMapDestinations(airPortCode, pointOfSaleCountry = "NO") {
        return sabreAPI.fetchFromDestinationFinder(airPortCode, pointOfSaleCountry)
            .then(res => {
                const destinationsMapped = res.map((destination, i) => (
                    <ShowCase title={destination.name}
                        key={`showcase_${i}`}
                        LowestFare={destination.lowestFare}
                        PricePerMile={destination.pricePerMile}
                        TravelDistance={destination.travelDistance}
                        CurrencyCode={destination.currency}
                        onClick={(e) => console.log(e)}
                    />
                ));

                this.setState({
                    countries: destinationsMapped,
                    error: !(destinationsMapped.length > 0)
                });

                return destinationsMapped.length > 0;
            })
            .catch(error => false);
    }

    render() {
        return (
            <AppContext.Provider value={{
                fetchAndMapDestinations: this.fetchAndMapDestinations,
                state: this.state,
                search: (value) => this.setState({
                    search: { value }
                })
            }}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}