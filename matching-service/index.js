const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const express = require('express')
const bodyParser = require('body-parser');
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json());
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

const matchRouter = require('./routes/matchRoutes');
const { createMatch } = require('./controller/matchController');

app.use('/api/match', matchRouter).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

const httpServer = createServer(app)

const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log("a user connected")

    socket.on('match', (data) => {
        console.log("match event from client")
        const { user, difficulty } = data;
        const match = createMatch(user, difficulty);
        io.emit('match', "finding a match...")
    })
})




httpServer.listen(8001, () => console.log('match-service listening on port 8001'));