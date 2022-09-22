const { createServer } = require("http");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const registerMatchHandlers = require("./eventHandlers/matchHandler");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

const httpServer = createServer(app);

const io = require("socket.io")(httpServer, {
	cors: {
		// TODO put link in .env
		origin: "http://localhost:3000"
	}
});

const onConnection = (socket) => {
	registerMatchHandlers(io, socket);
};

io.on("connection", onConnection);

httpServer.listen(8001, () => console.log("MatchService listening on port 8001"));