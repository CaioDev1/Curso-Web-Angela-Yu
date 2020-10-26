const express = require('express')
const https = require('https')

const app = express()

app.get('/', function(req, res) {
    https.get('https://api.kanye.rest/', function(response) {
        response.on('data', function(data) {
            const frase = JSON.parse(data)
            res.send(frase.quote)
        })
    })
})


app.listen(3000, () => {console.log('Server running on port 3000')})