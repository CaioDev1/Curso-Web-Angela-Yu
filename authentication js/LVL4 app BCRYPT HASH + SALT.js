const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlParser: true, useUnifiedTopology: true})

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

const userCollection = mongoose.model('User', userSchema)

const saltRounds = 10

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
                bcrypt.hash(password, saltRounds, function(err, hash) {
                    if(err) {
                        console.log(err)
                    } else {
                        const newUser = new userCollection({
                            email: email,
                            password: hash
                        })
                        newUser.save(function(err) {
                            err ? console.log(err) : res.render('secrets')
                            console.log(hash)
                        })
                    }
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
                bcrypt.compare(password, doc.password, function(err, result) {
                    if(result) {
                        res.render('secrets')
                    } else {
                        res.render('login', {result: 'Wrong password.'})
                    }
                })
            } else {
                res.render('login', {result: 'Login failed, user not registered.'})
            }
        }
    })
})


app.listen(3000)