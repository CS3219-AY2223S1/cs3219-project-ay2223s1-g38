import { getNumQuestions, getQuestionByDifficulty, getQuestionById, getQuestionWithBlacklist } from "../repository/questionRepository.js";
import { numberGenerator } from "../utils/numberGenerator.js";

export const getQuestionService = async () => {
	let rand = await numberGenerator([], await getNumQuestions());
	console.debug(rand);
	let question = await getQuestionById(rand);
	return question;
};

export const getQuestionByIdService = async (qid) => {
	let question = await getQuestionById(qid);
	return question;
};

export const getQuestionByDifficultyService = async (difficulty) => {
	let question = await getQuestionByDifficulty(difficulty);
	return question;
};

export const getQuestionServiceWithBlackList = async (list, difficulty) => {
	let question = await getQuestionWithBlacklist(list, difficulty);
	return question;
};