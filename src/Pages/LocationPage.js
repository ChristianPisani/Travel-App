import React, { Component } from 'react';

import { AppContext, AppProvider } from '../AppContext';

import UnsplashAPI from '../API/Unsplash';
import WikipediaAPI from '../API/Wikipedia';
import RestCountriesApi from '../API/RestCountries';

const unsplashAPI = new UnsplashAPI();
const wikipediaAPI = new WikipediaAPI();
const restCountriesApi = new RestCountriesApi();

export default class SearchResultPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            hasResults: false,
            images: "",
            coverImage: "",
            description: "",
            country: null
        }

        unsplashAPI.fetchCityImages(this.props.name).then(images => {
            this.setState({
                images: images.slice(1),
                coverImage: images[0].urls.full
            })
        });

        wikipediaAPI.fetchWikiText(this.props.name)
            .then(wikiText => {
                document.getElementById("location_info_text").innerHTML = wikiText;
            });

        restCountriesApi.fetchCountryFromCode("es")
            .then(res => {

            });
    }

    componentDidMount() {
        const titleHeader = document.getElementById("location_title");
        titleHeader.scrollIntoView(true);
    }

    render() {
        let images;

        if (this.state.images) {
            images = this.state.images.map(image => {
                return <img src={image.urls.regular} onClick={() => window.open(image.urls.raw)} />
            });
        }

        return (
            <AppContext.Consumer>
                {(context) => (
                    <div className="location_container">
                        <div className="location_background_image" style={{ backgroundImage: "url(" + this.state.coverImage + ")" }} >
                            <img src={this.state.coverImage} />
                        </div>

                        <div className="location_info">
                            <h1 id="location_title">{this.props.name}</h1>

                            <div className="location_info_text" id="location_info_text">
                                <p className="location_description">Loading info...</p>
                            </div>

                            <div className="location_info_bullets" id="location_info_bullets">
                                Loading info...
                            </div>

                            <div className="location_images" >
                                {images}
                            </div>
                        </div>
                    </div>
                )}
            </AppContext.Consumer>
        );
    }
}