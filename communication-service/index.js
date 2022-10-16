import http from "http";

import express from "express";
import { Server } from "socket.io";

const app = express(); 

const server = http.createServer(app); 
const io = new Server(server); 

const __dirname = "/Users/kevin9foong/Desktop/y3s1/cs3219/project/cs3219-project-ay2223s1-g38/communication-service";

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html"); 
});

io.on("connection", (socket) => {
	console.log("A user connected"); 

	socket.on("chat message", (msg) => {
		io.emit("chat message", msg);
	}); 
});

server.listen(9000, () => console.log("communication-server listening on port " + server.address().port)); 

