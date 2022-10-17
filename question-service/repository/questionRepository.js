import mongoose from "mongoose";

import "dotenv/config.js";

// eslint-disable-next-line no-undef
let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export const getQuestionById = async (id) => {
	try {
		console.debug("Retrieving question " + id + " from the database");
		let question = await db.collection("questionmodels").findOne({ "questionId" : id });
		console.debug(question);
		return question;
	} catch (err) {
		console.error("ERROR: Could not retrieve questions", err);
		throw err;
	}
};

export const getQuestionByDifficulty = async (difficulty) => {
	try {
		console.debug("Retrieving " + difficulty + " question from the database");
		let questionList = await db.collection("questionmodels").aggregate(
			[ { $match : { "difficulty" : difficulty } }, { $sample : { size : 1 } } ]
		).toArray();
		let question = questionList[0];
		console.debug(question);
		return question;
	} catch (err) {
		console.error("ERROR: Could not retrieve questions", err);
		throw err;
	}
};

export const getNumQuestions = async () => {
	try {
		const numQuestions = await db.collection("questionmodels").countDocuments();
		return numQuestions;
	} catch (err) {
		console.error("ERROR: Could not retrieve question count", err);
		throw err;
	}
};