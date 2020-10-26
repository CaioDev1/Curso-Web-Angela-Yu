const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const homeDBCollection = require('./homeDB')
const mongoose = require('mongoose')
const app = express()
const lodash = require('lodash')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost:27017/todolistReal', {useNewUrlParser:true, useUnifiedTopology: true})

const customSchema = new mongoose.Schema({
    name: String,
    items: [homeDBCollection.schema]
})

const customCollection = mongoose.model('custom', customSchema)

app.get('/', function(req, res) {
    homeDBCollection.find(function(err, doc) {
        if(!err) {
            res.render('list', {
                listTitle: 'Today',
                listContent: doc
            })
        }
    })
})

app.post('/', function(req, res) {
    const title = req.body.button

    if(title == 'Today') {
        const newItem = new homeDBCollection({
            name: 'Today',
            content: req.body.text
        })
        newItem.save(function() {
            res.redirect('/')
        })
    } else {
        customCollection.findOne({name: lodash.lowerCase(title)},function(err, doc) {
            console.log(doc)
            if(!err) {
                doc.items.push({
                    content: lodash.lowerCase(req.body.text)
                })
                doc.save(function() {
                    res.redirect('/' + title)
                })
            } else {
                console.log(err)
            }
        })
    }
})

app.get('/:list', function(req, res) {
    customCollection.findOne({name: lodash.lowerCase(req.params.list)}, function(err, doc) {
        if(!doc) {
            const newItem = new customCollection({
                name: lodash.lowerCase(req.params.list),
                items: []
            })
            newItem.save(function() {
                res.redirect('/' + req.params.list)
            })
        } else {
            res.render('list', {
                listTitle: lodash.capitalize(req.params.list),
                listContent: doc.items
            })
        }
    })
})

app.post('/delete', function(req, res) {
    const itemId = req.body.checkbox
    const listName = req.body.title

    if(listName == 'Today') {
        homeDBCollection.findByIdAndRemove({_id: itemId}, function(err) {
            if(err) {console.log('removing problem')} else {res.redirect('/')}
        })
    } else {
        customCollection.findOneAndUpdate({name: lodash.lowerCase(listName)}, {$pull: {items: {_id: itemId}}}, function(err) {
            err ? console.log('removing custom problem') : res.redirect('/' + listName)
        })
    }
})

app.listen(3000, function() {
    console.log('Server started on port 3000')
})