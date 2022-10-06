const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=5fb4d5ad0346267eec36b03c6017b0f3&query=" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + "&units=f"
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("unable to connect to weather service", undefined)
        } else if (body.error) {
            callback("unable to find location", undefined)
        } else {
            callback(undefined, "it is currently " + body.current.temperature + " degrees out and it feels like " + body.current.feelslike + " degrees out")
        }

    })

}

module.exports = forecast