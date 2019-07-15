import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                        loadPlane.classList.remove("loading");

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
        this.props.abortConnections();
    }

    render() {
        return (
            <div>
                <div className={this.state.loading ? "searchPage animatable_medium" : "searchPage animatable_medium fade"} >
                    <div className="loadPlaneContainer">
                        <p id="loadPlane" className="plane loading animatable_bounce_start_short">
                            <FontAwesomeIcon icon="plane" color="green" />
                        </p>
                    </div>
                </div>
                <div className={this.state.loading ? "hidden" : ""}>
                    {this.state.destinations}
                </div>
            </div>
        );
    }
}