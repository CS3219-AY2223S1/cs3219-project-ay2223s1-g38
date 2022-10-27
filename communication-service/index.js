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

const CHAT_BOT = "AlgoBot";
// const __dirname = "/Users/kevin9foong/Desktop/y3s1/cs3219/project/cs3219-project-ay2223s1-g38/communication-service";

app.get("/", (req, res) => {
	// res.sendFile(__dirname + "/index.html"); 
	res.send("hi");
});

io.on("connection", (socket) => {
	console.debug("A user connected!"); 

	socket.on("join_chatroom", ({ username, roomId }) => {
		console.debug(username + "joined room " + roomId); 
		socket.join(roomId); 
		
		io.to(roomId).emit("receive_message", {
			message: `${username} has joined the room`, 
			username: CHAT_BOT,
			date: new Date()
		});
	}); 

	socket.on("send_message", (data) => {
		const { msg, username, roomId } = data; 
		console.debug("Received msg: " + msg + " from user: " + username + " in room: " + roomId);  
		io.to(roomId).emit("receive_message", { message: msg, username: username, date: new Date() });
	});

	socket.on("leave_chatroom", (data) => {
		const { username, roomId } = data; 
		socket.leave(roomId); 
		io.to(roomId).emit("receive_message", {
			message: `${username} has left the room`, 
			username: CHAT_BOT,
			date: new Date()
		});
		socket.to(roomId).emit("user-disconnected");
		console.debug(`${username} has left the room`); 
	});

	socket.on("join_video_room", (data) => {
		const { userId, roomId } = data;
		socket.join(roomId);
		socket.to(roomId).emit("user-connected", userId);
	});

});

server.listen(9000, () => console.log("communication-server listening on port " + server.address().port)); 

