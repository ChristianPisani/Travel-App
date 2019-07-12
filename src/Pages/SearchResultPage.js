import React, { Component } from 'react';
import SearchPage from './SearchPage.js';

export default class SearchResultPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            hasResults: false
        }
    }

    componentDidMount() {
        let hasResults = false;
        if (this.props.locations.length > 0) {
            hasResults = true;
        }

        setTimeout(() => {
            const loadPlane = document.getElementById("loadPlane");

            loadPlane.classList.add("flyOut");
        }, 500);

        setTimeout(() => {
            this.setState({
                loading: false,
                hasResults
            });
        }, 1000);        
    }

    render() {
        return (
            <div>
                <div className={this.state.loading ? "searchPage animatable_medium" : "searchPage animatable_medium fade"} >
                    <p id="loadPlane" className="plane animatable_bounce_start_short">&#128747;</p>
                </div>
                <div className={this.state.loading ? "hidden" : ""}>
                    {this.props.locations}
                </div>    
            </div>
        );
    }
}