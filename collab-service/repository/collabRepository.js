import mongoose from "mongoose";

import RoomModel from "./roomModel.js";
import "dotenv/config.js";

// eslint-disable-next-line no-undef
let mongoDB = process.env.ENV == "production" ? process.env.DB_LOCAL_URI : process.env.DB_CLOUD_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export const addRoom = async (userId1, userId2, roomId, questionId) => {
	try {
		const room = { userId1, userId2, roomId, questionId };
		const newRoom = await new RoomModel(room).save();
		return newRoom;
	} catch (err) {
		console.error(err);
		return;
	}
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
	await db.collection("roommodels").updateOne(
		{ 
			roomId: room.roomId
		},
		{ 
			$set: { "questionId": newQuestionId },
		});
	return room;
};

export const deleteRoom = async (roomId) => {
	await db.collection("roommodels").deleteOne({ "roomId" : roomId });
};

export const addQuestionToQuestionBlacklistByRoom = async (room) => {
	await db.collection("roommodels").updateOne(room,
		{
			$push: {
				"questions": room.questionId
			}
		});
};
