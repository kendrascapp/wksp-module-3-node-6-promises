// Exercise 3 - `getAddressPosition`
// ---------------------------------
// 1. Go to https://darksky.net/dev/ and read the documentation
// 2. Signup and get a free API key
// 3. Complete the code of the function.
// The `position` parameter is an object with `lat` and `lng`.
// 4. Make sure your function only returns a `Promise` for the current temperature
// (a number) and nothing else

// Given a position (latitude and longitude), returns the position
const request = require('request-promise');

function getCurrentTemperatureAtPosition(position) {
    return request(`https://api.darksky.net/forecast/4610f73832d2840d1651224b17dfa323/${position.lat},${position.lng}`)
        .then(response => {
            const parsedResponse = JSON.parse(response);
            return parsedResponse.currently.temperature;
        })
}
getCurrentTemperatureAtPosition({ lat: 45.497118, lng: -73.579044 }).then(value => console.log(value));