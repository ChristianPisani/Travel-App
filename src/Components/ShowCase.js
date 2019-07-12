import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import UnsplashAPI from '../API/Unsplash';
import WikipediaAPI from '../API/Wikipedia';

const unsplashAPI = new UnsplashAPI();
const wikipediaAPI = new WikipediaAPI();

class ShowCase extends React.Component {
    ShowCase

    constructor(props) {
        super(props);

        this.state = {
            image: this.props.image,
            description: this.props.description
        };

        unsplashAPI.fetchCityImage(this.props.title).then(image => {
            this.setState({
                image
            })
        });

        wikipediaAPI.fetchWiki(this.props.title)
            .then(wikiText => {
                this.setState({
                    description: wikiText
                });
            });
    }

    render() {
        return (
            <div className="showcase_container type1" style={{ backgroundImage: "url(" + this.state.image + ")" }}>
                <div className="showcase_text_container">
                    <h1 className="showcase_title type1">{this.props.title}</h1>
                    <p className="showcase_description type1">{this.state.description}</p>
                    <p>Lowest fare: {this.props.LowestFare} {this.props.CurrencyCode}</p>
                    <p>Price per mile: {this.props.PricePerMile} {this.props.CurrencyCode}</p>
                    <p>Travel distance: {this.props.TravelDistance} miles</p>
                    {/*<button className="add_button type1" onClick={() => this.props.onClick(this.props.title)}>Add {this.props.title} to travel</button>*/}
                    <Link className="add_button type1" to={"/location/" + this.props.title}>More about {this.props.title}</Link>
                </div>
            </div>
        )
    }
};

export default ShowCase;