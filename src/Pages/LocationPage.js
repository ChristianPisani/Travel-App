import React, { Component } from 'react';

import { AppContext, AppProvider } from '../AppContext';

import UnsplashAPI from '../API/Unsplash';
import WikipediaAPI from '../API/Wikipedia';

const unsplashAPI = new UnsplashAPI();
const wikipediaAPI = new WikipediaAPI();

export default class SearchResultPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            hasResults: false,
            images: "",
            coverImage: "",
            description: ""
        }

        unsplashAPI.fetchCityImages(this.props.name).then(images => {
            this.setState({
                images: images.slice(1),
                coverImage: images[0].urls.full
            })
        });

        wikipediaAPI.fetchWiki(this.props.name)
            .then(wikiText => {
                this.setState({
                    description: wikiText
                });
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

                            <div className="location_info_text">
                                <p className="location_description">{this.state.description}</p>
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