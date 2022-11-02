import mongoose from "mongoose";
import "dotenv/config";

import UserModel from "./userModel.js";

// eslint-disable-next-line no-undef
let mongoDB = process.env.ENV == "production" ? process.env.DB_LOCAL_URI: process.env.DB_CLOUD_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export const createUserOrm = async (uid, username) => { 
	const user = new UserModel({ _id: uid, username });
	const savedUser = await user.save();
	return savedUser;
};

export const findUserByUsernameOrm = async (username) => {
	// const user = await db.collection("usermodels").findOne({ username });
	const user = await UserModel.findOne({ username });
	return user;
};

export const findUserByUidOrm = async (uid) => {
	const user = await UserModel.findById(uid);	
	return user;
};