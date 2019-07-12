import React, { Component } from 'react';

import { AppContext, AppProvider } from '../AppContext';

import UnsplashAPI from '../API/Unsplash';
const unsplashAPI = new UnsplashAPI();

export default class SearchResultPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            hasResults: false,
            image: ""
        }

        unsplashAPI.fetchCityImage(this.props.name).then(image => {
            this.setState({
                image
            })
        });
    }

    componentDidMount() {
        const titleHeader = document.getElementById("location_title");
        titleHeader.scrollIntoView(true);
    }

    render() {
        return (
            <AppContext.Consumer>
                {(context) => (
                    <div className="location_container">
                        <div className="location_background_image" style={{ backgroundImage: "url(" + this.state.image + ")" }} ><img src={this.state.image}/></div>                            
                        <h1 id="location_title">{this.props.name}</h1>
                    </div>
                )}
            </AppContext.Consumer>
        );
    }
}