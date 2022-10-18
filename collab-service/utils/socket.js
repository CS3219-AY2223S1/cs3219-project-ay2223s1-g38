import { Server } from "socket.io"

let io;
export const socketConnection = (server, eventHandler) => {
	io = new Server(server, {
		cors: {
			origin: "*",
			methods: [ "GET", "POST" ],
		},
	});

	io.on("connection", (socket) => {
		console.info(`Client connected [id=${socket.id}]`);
		eventHandler(io, socket);
	});
};

export const sendMessageToRoom = (roomId, key, message) => {
	io.to(roomId).emit(key, message);
};

export const getRooms = () => io.sockets.adapter.rooms;

export const isSocketConnected = (socket) => io.sockets.sockets.get(socket) !== undefined;

// TODO: Add function to check the number of clients connected in a room.