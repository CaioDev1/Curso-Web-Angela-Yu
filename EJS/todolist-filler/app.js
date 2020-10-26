const express = require('express')
const bodyParser = require('body-parser')
const date = require(__dirname + '/date.js')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')

let list = []
let workList = []

app.get('/', function(req, res) {
    let day = date.getDate()

    res.render('index', {
        listTitle: day,
        newListItem: list,
        page: '/'
    })
})

app.post('/:list', function(req, res) {
    if(req.params.list === 'work') {
        workList.push(req.body.newItem)
        res.redirect('/work')
    } else {
        list.push(req.body.newItem)
        res.redirect('/')
    }
    
})

app.get('/work', function(req, res) {
    res.render('index', {
        listTitle: 'Work List',
        newListItem: workList,
        page: 'work'
    })
})

app.get('/about', function(req, res) {
    res.render('about', {})
})


app.listen(3000)