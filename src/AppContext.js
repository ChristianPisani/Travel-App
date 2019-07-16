import React, { Component } from 'react';
import ShowCase from "./Components/ShowCase";

import SabreAPI from './API/Sabre.js';

export const AppContext = React.createContext();

const sabreAPI = new SabreAPI();
const abortContoller = new AbortController();

export class AppProvider extends Component {
    state = {
        search: '',
        loading: false,
        searchHits: [],
        name: "Travelicious App",
        countries: [],
        destinations: null
    }

    abortConnections() {
        abortContoller.abort();
    }

    fetchAndMapDestinations = (airPortCode, pointOfSaleCountry = "NO", date) => {
        if (!this.state.destinations || !this.state.destinations[airPortCode]) {
            return sabreAPI.fetchFromDestinationFinder(airPortCode, pointOfSaleCountry, date)
                .then(res => {
                    const destinationsMapped = this.mapDestinationsToShowcase(res);
                    console.log(res);
                    this.setState({ destinations: { [airPortCode]: res } });

                    return destinationsMapped;
                })
                .catch(error => false);
        } else {
            return new Promise((resolve, reject) => {
                const destinationsMapped = this.mapDestinationsToShowcase(this.state.destinations[airPortCode]);
                console.log(destinationsMapped);
                return resolve(destinationsMapped);
            });
        }
    }

    mapDestinationsToShowcase = (destinations) => {
        return destinations.map((destination, i) => (
            <ShowCase title={destination.name}
                country={destination.country}
                lat={destination.lat}
                lon={destination.lon}
                destinationAirportCode={destination.destinationAirportCode}
                originAirportCode={destination.originAirportCode}
                returnDate={destination.returnDate}
                departureDate={destination.departureDate}
                key={`showcase_${i}`}
                LowestFare={destination.lowestFare}
                PricePerMile={destination.pricePerMile}
                TravelDistance={destination.travelDistance}
                CurrencyCode={destination.currency}
                onClick={(e) => console.log(e)}
            />
        ));
    }

    componentWillUnmount() {
        console.log("App Provider OUT!");
    }

    render() {
        return (
            <AppContext.Provider value={{
                abortConnections: this.abortConnections,
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