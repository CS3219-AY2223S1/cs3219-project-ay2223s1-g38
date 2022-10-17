import { getNumQuestions, getQuestionById } from "../repository/questionRepository.js";
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

export const getQuestionServiceWithBlackList = async (list) => {
	let rand = await numberGenerator(list, await getNumQuestions());
	let question = await getQuestionById(rand);
	return question;
};