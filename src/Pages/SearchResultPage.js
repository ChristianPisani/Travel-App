import React, { Component } from 'react';
import SearchPage from './SearchPage.js';
import { AppContext } from '../AppContext.js';

export default class SearchResultPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            hasResults: false
        }
    }

    abortContoller = new AbortController();

    componentDidMount() {
        let hasResults = false;
        if (this.props.locations && this.props.locations.length > 0) {
            hasResults = true;
        } else {
            this.props.fetchLocations(this.props.query, this.props.origin)
                .then((destinations) => {
                    this.setState({ loading: false });

                    if (destinations.length > 0) {
                        const loadPlane = document.getElementById("loadPlane");

                        loadPlane.classList.add("flyOut");

                        setTimeout(() => {
                            this.setState({
                                loading: false,
                                hasResults: true,
                                destinations
                            });
                        }, 1000);
                    }
                })
        }
    }

    componentWillUnmount() {
        this.abortContoller.abort();
    }

    render() {
        return (
            <div>
                <div className={this.state.loading ? "searchPage animatable_medium" : "searchPage animatable_medium fade"} >
                    <p id="loadPlane" className="plane animatable_bounce_start_short">&#128747;</p>
                </div>
                <div className={this.state.loading ? "hidden" : ""}>
                    {this.state.destinations}
                </div>
            </div>
        );
    }
}