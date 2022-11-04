import http from "http";

import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";

import "dotenv/config.js";

import { roomSchema } from "./repo/messageSchema.js";

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


// eslint-disable-next-line no-undef
let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true });

const Room = mongoose.model("Room", roomSchema);
// const Message = mongoose.model("Message", messageSchema); 

const CHAT_BOT = "AlgoBot";

app.get("/", (req, res) => {
	res.send("hi");
});

var history =  {};

io.on("connection", (socket) => {
	console.debug("A user connected!"); 

	socket.on("join_chatroom", async ({ username, roomId }) => {
		console.debug(username + "joined room " + roomId); 
		socket.join(roomId); 

		Room.findOne({ roomId: roomId }, (err, room) => {
			// load past room message history if exists
			if (room) {
				io.to(socket.id).emit("load_room_history", room.messages); 
			} else {
				const newRoom = new Room({ roomId: roomId, messages: [] }); 
				newRoom.save(); 
			}
		});
	}); 

	socket.on("send_message", (data) => {
		const { msg, username, roomId } = data; 
		if (!history[roomId]) {
			history[roomId] = []; 
		}
		
		const newMsg = formatMessage(msg, username, new Date()); 
		saveMessageToDb(roomId, newMsg);

		console.debug("Received msg: " + msg + " from user: " + username + " in room: " + roomId);  
		io.to(roomId).emit("receive_message", newMsg);
	});

	socket.on("leave_chatroom", (data) => {
		const { username, roomId } = data;  

		const newMsg = formatMessage(`${username} has left the room`, CHAT_BOT, new Date());
		
		if (io.sockets.adapter.rooms.get(roomId).size > 1) {
			saveMessageToDb(roomId, newMsg);
		}
		
		io.to(roomId).emit("receive_message", newMsg);
		socket.to(roomId).emit("user-disconnected");
		console.debug(`${username} has left the room`); 

		console.log("cleaning up rooms in db");
		cleanUpRoomsInDb(socket.rooms, socket.id);

		socket.leave(roomId);
	});

	socket.on("join_video_room", (data) => {
		const { userId, roomId } = data;
		socket.join(roomId);
		socket.to(roomId).emit("user-connected", userId);
	});
});

// called before the size is updated to 0 (hence 1 means no more after the current socket leaves room)
const cleanUpRoomsInDb = (rooms, excludeRoomId) => {
	rooms.forEach(roomId => {
		console.log("Checking users for: " + roomId + " # users: " + io.sockets.adapter.rooms.get(roomId).size);
		if (roomId !== excludeRoomId && io.sockets.adapter.rooms.get(roomId).size <= 1) {
			console.log("Deleting room messages for: " + roomId);
			Room.deleteMany({ roomId: roomId }, (err) => {
				if (err) {
					console.log(err); 
				} else {
					console.log("Successful deletion");
				}
			}); 
		}
	});
};

const saveMessageToDb = (roomId, newMsg) => {
	Room.findOne({ roomId: roomId }, (err, room) => {
		if (room) {
			room.messages.push(newMsg);
			// only store past 50 messages max
			room.messages = room.messages.slice(Math.max(room.messages.length - 50, 0)); 
			room.save();
		}
	});
};

const formatMessage = (message, username, date) => {
	return { message: message, username: username, date: date };
};

server.listen(9000, () => console.log("communication-server listening on port " + server.address().port)); 

