// Exercise 5 - `getDistanceFromIss`
// ---------------------------------
// Again here you should re-use two previously created functions, plus the `getDistance` function provided to you in `workshop.js`.
//
// One of the functions does address ==> position and the other simply does nothing ==> position.
// The `getDistance` function needs the two positions to compute the final value.
const request = require('request-promise');
const opencage = require('opencage-api-client');

// Returns the current position of the ISS
function getIssPosition() {
    return request('http://api.open-notify.org/iss-now.json')
        .then(response => {
            const responseObject = JSON.parse(response);
            const issPosition = responseObject.iss_position;
            const payload = { lat: issPosition.latitude, lng: issPosition.longitude };
            return payload;
        })
}
///////
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
///////////


// Euclidian distance between two points
function getDistance(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1.lat - pos2.lat, 2) + Math.pow(pos1.lng - pos2.lng, 2));
}

// Given an address (a string), returns the distance between that address and the ISS
// You'll need to use getDistance, getIssPosition and getAddressPosition
function getDistanceFromIss(address) {
    return getIssPosition()
        .then(position1 => {
            return getAddressPosition(address)
                .then(position2 => {
                    return getDistance(position1, position2)
                })
        })
}
getDistanceFromIss('1453 Boulevard de Maisonneuve O, Montréal, QC H3G 1M8').then(value => console.log(value));