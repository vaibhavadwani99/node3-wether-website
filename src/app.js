const path = require("path")
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')


// epress is just a function and we call it to create a new express application



const app = express()

// Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'vaibhav adwani'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "about",
        name: "vaibhav adwani"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "vaibhav adwani",
        helpText: "this is my help text"
    })
})



app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "address must be provided"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address


            })
        })


    })

})


app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search item'
        })

    }

    console.log(req.query)


    res.send({
        products: []

    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "vaibhav adwani",
        errorMessage: "help article not found"

    })
})


app.get('*', (req, res) => {

    res.render("404", {
        title: "404",
        name: "vaibhav adwani",
        errorMessage: "page not found"

    })

})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})