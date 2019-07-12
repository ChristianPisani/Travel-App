import React, { Component } from 'react';
import Header from "./Components/Header";
import ShowCase from "./Components/ShowCase";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';

import SabreAPI from './API/Sabre.js';
import SearchPage from './Pages/SearchPage';
import LocationPage from './Pages/LocationPage';
import SearchResultPage from './Pages/SearchResultPage';

import { AppContext, AppProvider } from './AppContext';

const sabreAPI = new SabreAPI();

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            savedLocations: [],
            countries: [],
            redirect: false,
            redirectTo: "",
            error: false
        }
    }

    componentDidUpdate() {
        if (this.state.redirect) {
            this.setState({
                redirect: false,
                redirectTo: ""
            })
        }
    }

    setRedirect = (to) => {
        this.setState({
            redirect: true,
            redirectTo: { to }
        });
    }
    renderRedirect = (toRoute) => {
        if (this.state.redirect) {
            return <Redirect to={toRoute.to} />
        }
    }

    saveLocation = (location) => {
        let locations = this.state.savedLocations;
        locations.push(location);

        this.setState(...this.state, {
            savedLocations: locations
        });
        console.log(this.state);
    }

    render() {
        return (
            <AppProvider>
                <AppContext.Consumer>
                    {context => (
                        <Router>
                            <div className="main_container">
                                <Header title="Travelicious" />

                                {this.renderRedirect(this.state.redirectTo)}

                                <Route exact path="/" component={() =>
                                    <SearchPage redirect={this.setRedirect} fetchLocations={context.fetchAndMapDestinations.bind(this)} error={this.state.error} />
                                } />

                                <Route path="/search/:origin?/:query" component={({ match }) => {
                                    return <SearchResultPage origin={match.params.origin ? match.params.origin : "no"} query={match.params.query} fetchLocations={context.fetchAndMapDestinations.bind(this)} />
                                }} />

                                <Route path="/location/:place" component={({ match }) => <LocationPage name={match.params.place} />} />
                            </div>
                        </Router>
                    )}
                </AppContext.Consumer>
            </AppProvider>
        )
    }
}
