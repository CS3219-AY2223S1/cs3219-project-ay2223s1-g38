import { getNumQuestions, getQuestionById } from "../repository/questionRepository.js";

export const getQuestionService = async () => {
	let rand = 0;
	while (rand === 0) {
		rand = Math.ceil(Math.random() * await getNumQuestions());
	}
	let question = await getQuestionById(rand);
	return question;
};

export const getQuestionServiceWithBlackList = async (list) => {
	let rand = 0;
	while (rand === 0 || list.includes(rand)) {
		rand = Math.ceil(Math.random() * await getNumQuestions());
	}
	let question = await getQuestionById(rand);
	return question;
};