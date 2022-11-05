import mongoose from "mongoose";

import "dotenv/config.js";
import HistoryModel from "./historyModel.js";


// eslint-disable-next-line no-undef
let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export const getHistory = async (uid) => {
	try {
		console.debug("Retrieving user " + uid + "'s history from the database");
		let history = await db.collection("historymodels").aggregate(
			[ { $match : { "$or" : [ { "uid1" : String(uid) }, { "uid2" : String(uid) } ] } } ]
		).toArray();

		console.debug(history);
		return history;
	} catch (err) {
		console.error("ERROR: Could not retrieve histories", err);
		throw err;
	}
};

export const addHistory = async (uid1, uid2, roomId, qid, difficulty) => {
	try {
		const history = new HistoryModel({ uid1, uid2, roomId, qids: [ qid ], difficulty });
		const savedHistory = await history.save();
		return savedHistory;
	} catch (err) {
		console.error("ERROR: Could not save histories", err);
		throw err;
	}
};

export const updateHistory = async (uid1, uid2, qid) => {
	try {
		const oldHistory = await db.collection("historymodels").find({ $or : [ { uid1, uid2 }, { "uid1" : uid2, "uid2" : uid1 } ] }).sort({ createdAt: -1 }).limit(1).toArray();
		const ohuid1 = oldHistory[0].uid1;
		const ohuid2 = oldHistory[0].uid2;
		const ohcreatedAt = oldHistory[0].createdAt;
		const ohqids = oldHistory[0].qids;
		ohqids.push(qid);

		const history = await db.collection("historymodels").findOneAndUpdate({ "uid1" : ohuid1, "uid2" : ohuid2, "createdAt" : ohcreatedAt }, 
			{ $set : { "qids" : ohqids } }, { returnDocument: "after" } );
		return history.value;
	} catch (err) {
		console.error("ERROR: Could not update history", err);
		throw err;
	}
};

export const updateHistoryByRoomId = async (roomId, qid) => {
	try {
		const oldHistory = await db.collection("historymodels").find({ roomId }).sort({ createdAt: -1 }).limit(1).toArray();
		const ohroomId = oldHistory[0].roomId;
		const ohcreatedAt = oldHistory[0].createdAt;
		const ohqids = oldHistory[0].qids;
		ohqids.push(qid);

		const history = await db.collection("historymodels").findOneAndUpdate({ "roomId" : ohroomId, "createdAt" : ohcreatedAt }, 
			{ $set : { "qids" : ohqids } }, { returnDocument: "after" } );
		return history.value;
	} catch (err) {
		console.error("ERROR: Could not update history", err);
		throw err;
	}
};