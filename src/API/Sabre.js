import React, { Component } from 'react';
import { sabreAccessToken as accessToken } from './Keys';

const baseUrl = "https://api-crt.cert.havail.sabre.com";
const destinationFinderUrl = "/v2/shop/flights/fares";
const pointOfSaleCountriesUrl = "/v1/lists/supported/pointofsalecountries";

class SabreAPI extends React.Component {
    getDestinationFinderUrl() {
        return baseUrl + destinationFinderUrl;
    }

    fetchFromDestinationFinder = async (airPortCode, pointOfSaleCountry = "NO", date) => {
        let url = baseUrl + destinationFinderUrl;
        url += `?origin=${airPortCode}&earliestdeparturedate=${date}&latestdeparturedate=${date}&lengthofstay=7&pointofsalecountry=${pointOfSaleCountry}`;

        return fetch(url, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                "grant_type": 'client_credentials'
            }
        })
            .then(res => res.json())
            .then(res => {
                return this.mapDestinationGeoCodesToNames(res)
            })
            .catch(error => "error");
    }

    mapDestinationGeoCodesToNames = async (res) => {
        console.log("Mapping cities");
        console.log(res);
        let destinationsMapped = [];

        if (res.status) {
            return destinationsMapped;
        }

        const promises = res.FareInfo.map(des => (
            this.getCityByGeoCode(des.DestinationLocation)
        ));

        await Promise.all(promises)
            .then(resolves => {
                resolves.forEach((destination, index) => {
                    destinationsMapped.push({
                        ...destination,
                        name: destination.city,
                        lowestFare: res.FareInfo[index].LowestFare.Fare,
                        currency: res.FareInfo[index].CurrencyCode,
                        pricePerMile: res.FareInfo[index].PricePerMile,
                        travelDistance: res.FareInfo[index].Distance,
                        returnDate: res.FareInfo[index].ReturnDateTime,
                        departureDate: res.FareInfo[index].DepartureDateTime,
                        destinationAirportCode: res.FareInfo[index].DestinationLocation,
                        originAirportCode: res.OriginLocation
                    });
                });
            })
            .catch(error => {

            });

        return destinationsMapped;
    }

    getCityByGeoCode = async (geo) => {
        return fetch(baseUrl + "/v1/lists/utilities/geocode/locations", {
            method: "POST",
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json',
                "grant_type": 'client_credentials'
            },
            body: JSON.stringify([{
                "GeoCodeRQ": {
                    "PlaceById": {
                        "Id": geo,
                        "BrowseCategory": {
                            "name": "AIR"
                        }
                    }
                }
            }])
        })
            .then(res => res.json())
            .then(res => {
                const place = res.Results[0].GeoCodeRS.Place[0];
                return {
                    city: place.Name,
                    country: place.Country,
                    lat: place.latitude,
                    lon: place.longitude
                }
            })
            .catch(error => "No city found");
    }

    getPointOfSaleCountries = async (geo) => {
        return fetch(baseUrl + pointOfSaleCountriesUrl, {
            headers: {
                Authorization: accessToken,
                'Content-': 'application/json',
                "grant_type": 'client_credentials'
            }
        })
            .then(res => res.json())
            .then(res => res)
            .catch(error => "No city found");
    }
}

export default SabreAPI;