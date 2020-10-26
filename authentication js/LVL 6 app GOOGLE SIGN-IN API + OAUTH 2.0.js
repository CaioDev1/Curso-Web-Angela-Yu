const dotenv = require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const findOrCreate = require('mongoose-findorcreate')

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(session({
    secret: 'xande',
    resave: false,                       // CONFIGURAÇÃO DO SESSION (CUIDA DOS COOKIES)
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())              // CONFIGURA O PASSPORT () 

mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.set('useCreateIndex', true)

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String
})

userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate)       // CONFIGURA A COLLECTION A TER A FUNÇÃO findOrcreate USADA ABAIXO  

const userCollection = mongoose.model('User', userSchema)

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });                                      // FUNÇÕES DE SERIALIZE E DESERIALIZE, PORÉM DIFERENTE DO PASSPORT-LOCAL-MONGOOSE
                                           // AGORA FUNCIONA PARA TODOS OS TIPOS DE STRATEGIES
  
passport.deserializeUser(function(id, done) {
  userCollection.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,      // CHAVES DE AUTENTICAÇÃO CEDIDAS PELA API CRIADA NO GOOGLE DEVELOPERS WEBSITE
    clientSecret: process.env.SECRET_ID,
    callbackURL: "http://localhost:3000/auth/google/secrets",  // PRA ONDE O GOOGLE VAI RETORNAR QUANDO AUTENTICAR A CONTA NA SESSÃO DE LOGIN
  },
  function(accessToken, refreshToken, profile, cb) {
    userCollection.findOrCreate({ googleId: profile.id }, function (err, user) {  // FINALMENTE USANDO A FUNÇÃO CRIADA COM O PACOTE findOrCreate PRA
      return cb(err, user);                                                       // NO BANCO DE DADOS O PROFILE ID DA PESSOA QUE LOGOU COM A CONTA 
    });
  }
))


app.get('/', function(req, res) {
    res.render('home')
})

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }))   // SERVE PRA CHAMAR A API DO GOOGLE DE LOGIN (COM O ESCOPO DE CONTAS)

app.get('/auth/google/secrets', 
  passport.authenticate('google', { failureRedirect: '/login' }),  // RESPOSTA DO SERVER QUANDO O GOOGLE AUTENTICAR E REDIRECIONAR PARA ESSA ROTA
  function(req, res) {
    // Successful authentication, redirect secrets.
    res.redirect('/secrets');
  })

app.get('/register', function(req, res) {
    res.render('register')
})

app.get('/login', function(req, res) {
    res.render('login')
})

app.get('/secrets', function(req, res) {
    if(req.isAuthenticated()) {
        res.render('secrets')
    } else {
        res.redirect('/login')
    }
})

app.get('/logout', function(req, res) {
    req.logout()                           // APAGA O COOKIE EM TEORIA

    res.redirect('/')
})

app.post('/register', function(req, res) {
    const email = req.body.username
    const password = req.body.password

    userCollection.register({username: email}, password, function(err, user) { // PASSPORT-LOCAL-MONGOOSE FUNCTION
        if(err) {
            console.log(err)
            res.redirect('/register')
        } else {
             passport.authenticate('local')(req, res, function() { // PASSPORT FUNCTION
                 res.redirect('/secrets')
             })
        }
    })
})

app.post('/login', function(req, res) {
    const user = new userCollection({
        username: req.body.username,
        password: req.body.password
    }) 

    req.login(user, function(err) {  // PASSPORT-LOCAL-MONGOOSE FUNCTION
        if(err) {
            console.log(err)
            res.redirect('/login')
        } else {
            passport.authenticate('local')(req, res, function() {
                res.redirect('/secrets')
            })
        }
    })
})

app.listen(3000)

