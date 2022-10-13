const { Server } = require("socket.io");

let io;
exports.socketConnection = (server, eventHandler) => {
	io = new Server(server, {
		cors: {
			origin: "*",
			methods: [ "GET", "POST" ],
		},
	});

	io.on("connection", (socket) => {
        
		console.info(`Client connected [id=${socket.id}]`);
		socket.join(socket.id);
		eventHandler(io, socket);
	});
};

exports.sendMessage = (roomId, key, message) => {
	io.to(roomId).emit(key, message);
};

exports.sendToTwoUsers = (socketId1, socketId2, key, message) => {
	io.to(socketId1).emit(key, message);
	io.to(socketId2).emit(key, message);
};

exports.getRooms = () => io.sockets.adapter.rooms;


exports.isSocketConnected = (socket) => io.sockets.sockets.get(socket) !== undefined;