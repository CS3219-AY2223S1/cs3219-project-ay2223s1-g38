import UserModel from "./user-model.js";
import "dotenv/config";

import mongoose from "mongoose";

// eslint-disable-next-line no-undef
let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export async function createUser(params) { 
	return new UserModel(params);
}

export async function login(params) {
	let user = await db.collection("usermodels").findOne({ username : params.username, password : params.password });
	return user;
}

export async function isUserExists(username) {
	let user = await db.collection("usermodels").findOne({ username : username });
	return (user != null);
}
