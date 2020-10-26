const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true})

const articles = mongoose.model('articles', {
    title: String,
    content: String
})

app.route('/articles')
    .get(function(req ,res) {
        articles.find(function(err, doc) {
            if(!err) {
                res.send(doc)
            } else {
                console.log(err)
            }
        })
    })
    .post(function(req ,res) {
        const newArticle = new articles({
            title: req.body.title,
            content: req.body.content
        })
        newArticle.save(function() {
            res.redirect('/articles')
        })
    })
    .delete(function(req, res) {
        articles.deleteMany(function(err) {
            if(!err) {
                res.send('Removed successfully')
            } else {
                res.send('Delete error')
            }
        })
    })

app.route('/articles/:title')
    .get(function(req, res) {
        articles.findOne({title: req.params.title}, function(err, doc) {
            if(!err) {
                res.send(doc)
            } else {
                res.send(err)
            }
        })
    })
    .put(function(req, res) {
        articles.update({title: req.params.title}, {title: req.body.title, content: req.body.content}, {overwrite: true}, function(err) {
            if(!err) {
                res.send('Successfully updated')
            } else {
                res.send('Put update error')
            }
        })
    })
    .patch(function(req, res) {
        articles.update({title: req.params.title}, {$set: req.body}, function(err) {
            if(!err) {
                res.send('Especific item updated.')
            } else {
                res.send('Patch update error.')
            }
        })
    })
    .delete(function(req, res) {
        articles.deleteOne({title: req.params.title}, function(err) {
            if(!err) {
                res.send('Successfully deleted.')
            } else {
                res.send('Especific delete error.')
            }
        })
    })

app.listen(3000)