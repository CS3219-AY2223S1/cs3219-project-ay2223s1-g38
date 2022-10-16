const { createServer } = require("http");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const registerMatchHandlers = require("./producer/eventHandlers/matchHandler");
const registerDisconnectHandler = require("./producer/eventHandlers/disconnectHandler");
const { socketConnection } = require("./utils/socket");
const connect = require("./consumer/consumer");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

const httpServer = createServer(app);

const onConnection = (io, socket) => {
	registerMatchHandlers(io, socket);
	registerDisconnectHandler(io, socket);
};

socketConnection(httpServer, onConnection);
connect();


httpServer.listen(8001, () => console.log("MatchService listening on port 8001"));