const { Server } = require("socket.io");
const ioClient = require("socket.io-client");
const { SessionEvent } = require("../constants/events");

let io;
let clientSocket;
exports.connectToCollabService = () => {
	const namespace = process.env.URI_COLLAB_SVC || "localhost:8088";
	clientSocket = ioClient.connect(`ws://${namespace}`);
};

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

exports.createNewSession = (uid1, uid2, roomId, difficulty, callback) => {
	clientSocket.emit(SessionEvent.CREATE, { uid1, uid2, roomId, difficulty });
	clientSocket.on(SessionEvent.CREATE, (data) => callback({ ...data, difficulty }));
};

exports.getRooms = () => io.sockets.adapter.rooms;


exports.isSocketConnected = (socket) => io.sockets.sockets.get(socket) !== undefined;