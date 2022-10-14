import mongoose from "mongoose";

import RoomModel from "./roomModel.js";
import "dotenv/config.js";

// eslint-disable-next-line no-undef
let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export const addRoom = async (userId1, userId2, roomId, questionId) => {
	const room = { userId1, userId2, roomId, questionId };
	const newRoom = await new RoomModel(room).save();
	return newRoom;
};

export const findRoomByUid = async (userId) => {
	const room = await db.collection("roommodels").findOne({ $or:[
		{ "userId1": userId },
		{ "userId2": userId }
	] });
	console.debug(room);
	return room;
};

export const findRoomByRoomId = async (roomId) => {
	const room = await db.collection("roommodels").findOne({ "roomId" : roomId });
	return room;
};

export const updateQuestionId = async (room, newQuestionId) => {
	await db.collection("roommodels").updateOne(room, { $set: { "questionId": newQuestionId } });
	return { "userId1": room.userId1, "userId2": room.userId2, "roomId" : room.roomId, "questionId" : newQuestionId };
};

export const deleteRoom = async (roomId) => {
	await db.collection("roommodels").deleteOne({ "roomId" : roomId });
};
