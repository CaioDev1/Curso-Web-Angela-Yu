const dotenv = require('dotenv').config()  // SEMPRE COLOCAR NO TOPO
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
const encrypt = require('mongoose-encryption')


const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlParser: true, useUnifiedTopology: true})

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

const teste = userSchema.plugin(encrypt, {secret: process.env.ENCRYPT_KEY, encryptedFields: ['password']})

const userCollection = mongoose.model('User', userSchema)

app.get('/', function(req, res) {
    res.render('home')
})

app.get('/register', function(req, res) {
    res.render('register', {result: ''})
})

app.get('/login', function(req, res) {
    res.render('login', {result: ''})
})

app.post('/register', function(req, res) {
    const email = req.body.username
    const password = req.body.password

    userCollection.findOne({email: email}, function(err, doc) {
        if(err) {
            console.log(err)
        } else {
            if(doc) { 
                res.render('register', {result: 'Account already registered.'})
            } else {
                const newUser = new userCollection({
                    email: email,
                    password: password
                })
                newUser.save(function(err) {
                    err ? console.log(err) : res.render('secrets')
                })
            }
        }
    })
})

app.post('/login', function(req, res) {
    const email = req.body.username
    const password = req.body.password

    userCollection.findOne({email: email}, function(err, doc) {
        if(err) {
            console.log(err)
        } else {
            if(doc) {
                if(doc.password === password) {
                    res.render('secrets')
                } else {
                    res.render('login', {result: 'Wrong password.'})
                }
            } else {
                res.render('login', {result: 'Login failed, user not registered.'})
            }
        }
    })
})

// PERMITE VER OS DADOS ENCRYPTADOS NO DB
userCollection.find(function(err, doc) {
    err ? console.log(err) : console.log(doc)
})


app.listen(3000)