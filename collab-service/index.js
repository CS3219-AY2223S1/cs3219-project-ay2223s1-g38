import cors from "cors";
import express from "express";
import { createServer } from "http";

import { handleAddRoom, handleDeleteRoom, handleFindRoomByUid, handleUpdateQuestionId } from "./controller/collabController.js";

import createSessionHandler from "./eventHandlers/createSessionHandler.js";
import leaveHandler from "./eventHandlers/disconnectHandler.js";
import joinSessionHandler from "./eventHandlers/joinSessionHandler.js";
import updateSessionQuestionHandler from "./eventHandlers/updateSessionQuestionHandler.js";
import { socketConnection } from "./utils/socket.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

const router = express.Router();

app.use("/api/collab", router).all((_, res) => {
	res.setHeader("content-type", "application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");
});

router.post("/addRoom", handleAddRoom);
router.post("/findRoomByUid", handleFindRoomByUid);
router.put("/updateQuestionId", handleUpdateQuestionId);
router.delete("/deleteRoom", handleDeleteRoom);

const httpServer = createServer(app);

const onConnection = (io, socket) => {
	joinSessionHandler(io, socket);
	createSessionHandler(io, socket);
	updateSessionQuestionHandler(io, socket);
	leaveHandler(io, socket);
};

socketConnection(httpServer, onConnection);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => console.log("CollabService listening on port", PORT))