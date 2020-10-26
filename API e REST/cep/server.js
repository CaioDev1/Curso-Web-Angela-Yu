const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')


const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', function(req, res) {
    let cep = req.body.cep
    cep = cep.replace('-', '')
    const cepUrl = `https://viacep.com.br/ws/${cep}/json/`

    https.get(cepUrl, function(response) {
        response.on('data', function(data) {
            const cepData = JSON.parse(data)

            res.write(`<h1>CEP: ${cepData.cep}</h1>`)
            res.write(`<h1>Logradouro: ${cepData.logradouro}</h1>`)
            res.write(`<h1>Bairro: ${cepData.bairro}</h1>`)
            res.write(`<h1>Cidade: ${cepData.localidade}</h1>`)
            res.write(`<h1>UF: ${cepData.uf}</h1>`)

            res.send()
        })
    })
})



app.listen(3000, () => {
    console.log('Server iniciado porta: 3000');
})


