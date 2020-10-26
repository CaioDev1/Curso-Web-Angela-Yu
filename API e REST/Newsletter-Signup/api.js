/*const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/signup.html')
})

app.post('/', function(req, res) {
    let firstName = req.body.fname
    let lastName = req.body.lname
    let email = req.body.email

    let data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }

    let jsonData = JSON.stringify(data)

    const apiUrl = `https://us4.api.mailchimp.com/3.0/lists/7be1fccb7c` // código dps do list é o audience ID pego nas configs do site, us4 é o servidor no final da key

    const options = { // estamos trabalhando com o método simples de autenticação na função https.request 
        method: 'POST', // na documentação da api pede que o options seja por objeto, passando os paramentros exatos que eles pediram 
        auth: 'caiovapo:46c74783cb7150ae877392464e47ad7a-us4' // nome pode ser qualquer junto com :(key)
    }

    let status
    const request = https.request(apiUrl, options, function(response) {
        response.statusCode == 200 ? res.sendFile(__dirname + '/success.html') : res.sendFile(__dirname + '/failure.html')

        response.on('data', function(data) { // essa função é só pra mostrar no console o resultado do request pelo visto
            console.log(JSON.parse(data))  
        })
    })

    request.write(jsonData)
    request.end() 
})


app.post('/failure', function(req, res) {
    res.redirect('/')
})


app.listen(3000)*/




const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')


const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/signup.html')
})

app.post('/', function(req, res) {
    const firstName = req.body.fname
    const lastName = req.body.lname
    const email = req.body.email

    const apiUrl = `https://us4.api.mailchimp.com/3.0/lists/7be1fccb7c`

    const options = {
        method: 'POST',
        auth: 'caiovapo:46c74783cb7150ae877392464e47ad7a-us4'
    }

    let request = https.request(apiUrl, options, function(response) {
        response.statusCode == 200 ? res.sendFile(__dirname + '/success.html') : res.sendFile(__dirname + '/failure.html')
        
        response.on('data', function(data) {
            console.log(JSON.parse(data))
        })
    })

    let data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }

    request.write(JSON.stringify(data))
    request.end()
})

app.post('/failure', function(req, res) {
    res.redirect('/')
})


app.listen(process.env.PORT || 3000)
