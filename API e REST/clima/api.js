const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', function(req, res) {
    let city = req.body.city
    const apiKey = 'e59daefad9a48ce47e4f44bae133de47'
    const unit = 'metric'

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
    
    https.get(apiUrl, function(response) {
        response.on('data', function(data) {
            const weatherData = JSON.parse(data)

            const temperature = weatherData.main.temp
            const feels_like = weatherData.main.feels_like
            const description = weatherData.weather[0].description
            const img = weatherData.weather[0].icon

            const imgUrl = `http://openweathermap.org/img/wn/${img}@2x.png`
            
            res.write(`<h1> O clima em ${city}: </h1>`)
            res.write(`<h1> A temperatura: ${temperature} </h1>`)
            res.write(`<h2> A sensacao: ${feels_like} </h2>`)
            res.write(`<h3> Descricao: ${description} </h3>`)
            res.write(`<img src="${imgUrl}">`)
        })
    })
})


app.listen(3000)