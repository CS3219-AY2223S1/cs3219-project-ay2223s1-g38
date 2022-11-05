import http from "http";

import cors from "cors";
import express from "express";
import { Server } from "socket.io";

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
	socket.on("leave_video_room", (data) => {
		const { username, roomId } = data; 
		socket.leave(roomId); 
		socket.to(roomId).emit("user-disconnected-video");
		console.debug(`${username} has left the video room`); 
	});

	socket.on("join_video_room", (data) => {
		const { userId, roomId } = data;
		socket.join(roomId);
		socket.to(roomId).emit("user-connected-video", userId);
	});

});

server.listen(9001, () => console.log("video-service listening on port " + server.address().port)); 

