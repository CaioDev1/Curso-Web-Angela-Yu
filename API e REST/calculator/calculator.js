const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended: true})) // o express pode usar certos pacotes pra exercutar algumas funções também (urlencoded é dados passados pelo html)

app.get('/', function(req, res) {
   // res.send('Hello World') o .send envia um html simples como response
   //.senFile envia um arquivo como response, nesse caso vai ser um arquivo html
   res.sendFile(__dirname + '/index.html') // __dirname é o endereço (caminho c:/users/.....) dos arquivos do pc
})

app.post('/', function(req, res) { // post funciona para quando o usuário enviar dados para o servidor pelo método POST, nesse caso, na página raiz (root)
    
    console.log(req.body)
    
    let valor1 = Number(req.body.num1)  // num1 e num2 são os name declarados nos inputs html
    let valor2 = Number(req.body.num2)

    let result = valor1 + valor2

    res.send('O resultado foi: ' + result)
})


app.get('/bmicalculator', function(req, res) {
    
    res.sendFile(__dirname + '/bmicalculator.html')
})

app.post('/bmicalculator', function(req, res) {

    let height = Number(req.body.height) // req pelo visto é o que o usuário insere 
    let weight = Number(req.body.weight) // res pelo visto é o retorno do site pra isso

    let bmi = weight / height ** 2

    res.send('O resultado do seu BMI foi: ' + bmi)
})


app.listen(3000, function() {
    console.log('Server iniciado na porta 3000')
})
