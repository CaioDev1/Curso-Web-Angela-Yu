const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const dbCollection = require('./dbconfig')
const lodash = require('lodash')

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//mongodb://localhost:27017/(db name)
mongoose.connect('mongodb+srv://caiothegod:db123@cluster0-wdivt.gcp.mongodb.net/todolistDB', {useNewUrlParser: true, useUnifiedTopology: true})

const item1 = {
  name: 'Do my homework'
}
const item2 = {
  name: 'Call my bro'
}
const item3 = {
  name: 'Survive from quarantine'
}

const defaultItens = [item1, item2, item3]

const customListSchema = {
  name: String,
  items: [dbCollection.schema]
}

const customList = mongoose.model('lists', customListSchema)

app.get("/", function(req, res) {
  dbCollection.find(function(err, doc) {
    if(doc.length === 0) {
      dbCollection.insertMany(defaultItens, function(err) {
        err ? console.log(err) : console.log('Inserted')
        
        res.redirect('/') 
      })
    } 
    res.render("list", {listTitle: 'Today', newListItems: doc})
  })
})

app.post("/", function(req, res){
  const item = req.body.newItem;
  const listName = req.body.list

  if(listName === 'Today') {
    const newItem = new dbCollection({
      name: item
    })
    newItem.save()
    res.redirect("/");
  } else {
    customList.findOne({name: listName}, function(err, foundList) {
      err ? console.log(err) : foundList.items.push({name: item})
      foundList.save(function(err) {
        err ? console.log(err) : res.redirect('/' + listName)
      })
    })
  }
});

app.post('/delete', function(req, res) {
  const checkedItemId = req.body.checkbox
  const listName = req.body.listName

  if(listName == 'Today') {
    dbCollection.findByIdAndRemove({_id: checkedItemId}, function(err) {
      if(!err) {
        console.log('Removed successfully')
        res.redirect('/')
      } else {
        console.log(err)
      }
    })
  } else {
    customList.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, doc) {
      err ? console.log(err) : res.redirect('/' + listName)
    })
  }
  
  
})

app.get('/:customListName', function(req, res) {
  const customListName = lodash.capitalize(req.params.customListName)

  customList.findOne({name: customListName}, function(err, list) {
    if(!err) {
      if(!list) {
        const newCustomList = new customList({
          name: customListName,
          items: defaultItens
        })
        newCustomList.save(function(err) {
          err ? console.log('save error') : res.redirect('/' + customListName)
        })
      } else {
        res.render("list", {listTitle: list.name, newListItems: list.items})
      }
    }
  })
  
})

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
