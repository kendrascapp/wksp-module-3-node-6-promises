// Exercise 4 - `getCurrentTemperature`
// -----------------------------------
// While it's useful to get the current temperature for a specific lat/lng,
// most often we want to provide the name of a place instead.
// 
// You already created a function that can do address ==> position,
// and one that can do position ==> temperature. For this exercise,
// re-use these two functions to create one that goes directly from address ==> temperature.
// 
// You can copy/paste your code from the previous exercises,
// or require them at the top of this file.
// Remember to _export_ them from their file, if you plan on _requiring_ them.
const request = require('request-promise');
const opencage = require('opencage-api-client');

function getAddressPosition(address) {
    const requestObj = {
        key: 'e1b9292e6840458fb3d45a8d8e34c051',
        q: address
    };

    return opencage.geocode(requestObj)
        .then(data => {
            const place = data.results[0];
            return place.geometry;
        })
}

////////

function getCurrentTemperatureAtPosition(position) {
    return request(`https://api.darksky.net/forecast/4610f73832d2840d1651224b17dfa323/${position.lat},${position.lng}`)
        .then(response => {
            const parsedResponse = JSON.parse(response);
            return parsedResponse.currently.temperature;
        })
}


// Given an address as a string, returns the temperature
// Use the getCurrentTemperatureAtPosition function
function getCurrentTemperature(address) {
    return getAddressPosition(address)
        .then(positionResponse => {
            return getCurrentTemperatureAtPosition(positionResponse)
        })
}
getCurrentTemperature('1453 Boulevard de Maisonneuve O, Montréal, QC H3G 1M8').then(asdfg => console.log(asdfg));