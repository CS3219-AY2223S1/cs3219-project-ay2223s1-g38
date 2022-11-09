import http from "http";

import cors from "cors";
import express from "express";
import { Server } from "socket.io";

import { VideoEvent } from "./constants.js";

const app = express(); 
app.use(cors());
app.options("*", cors());

const server = http.createServer(app); 
const io = new Server(server, { 
	cors: {
		origin: "*"
	}
}
); 

app.get("/", (req, res) => {
	res.send("Root path");
});

io.on("connection", (socket) => {
	console.debug("A user connected to the video socket!"); 
	socket.on(VideoEvent.LEAVE, (data) => {
		const { username, roomId } = data; 
		socket.leave(roomId); 
		socket.to(roomId).emit(VideoEvent.DISCONNECT);
		console.debug(`${username} has left the video room`); 
	});

	socket.on(VideoEvent.JOIN, (data) => {
		const { userId, roomId } = data;
		socket.join(roomId);
		socket.to(roomId).emit(VideoEvent.CONNECT, userId);
	});

});

server.listen(9001, () => console.log("video-service listening on port " + server.address().port)); 

