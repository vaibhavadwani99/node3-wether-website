const request = require("request")


const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYWJjOTkiLCJhIjoiY2w4c2dvY201MGU3dDNvczR4NWE0MTlrZyJ9.Rhp7orG14I4fzSvP29Tk3A&limit=1"
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("unable to connect to mapbox location service!", undefined)
        } else if (body.features.length === 0) {
            callback("unable to find location.Try another search", undefined)
        } else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const place = body.features[0].place_name
            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                location: place

            })

        }

    })

}

module.exports = geocode

