import mongoose from "mongoose";
import "dotenv/config";

import UserModel from "./userModel.js";

// eslint-disable-next-line no-undef
let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export const createUser = (params) => { 
	return new UserModel(params);
};

export const findUserByUsername = async (username) => {
	let user = await db.collection("usermodels").findOne({ username });
	console.debug("Found user: " + user._id);
	return user;
};
