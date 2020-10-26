const server = require('http').createServer()
const io = require("socket.io")(server)
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    text: String
})

const model = mongoose.model('messages', schema)

mongoose.connect('mongodb+srv://caiothegod:caio123@cluster0-wdivt.gcp.mongodb.net/teste?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {console.log('MongoDB Connected')})
    .catch((err) => {console.log(err)})

io.on('connection', socket => {
    console.log('Conectou, id: ' + socket.id)

    model.find().then(db_messages => {
        io.emit('messages', db_messages)
    }) 

    socket.on('send', message => {
        console.log(message)

        const newMessage = new model({
            text: message
        })

        newMessage.save(() => {
            model.find().then(db_messages => {
                io.emit('messages', db_messages)
            })
        })
    })
})


server.listen(5000, () => {
    console.log('server running on port 5000')
})