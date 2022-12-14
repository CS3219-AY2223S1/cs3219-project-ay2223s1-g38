import { blackListSchema } from "../dto/blacklistDto.js";
import { difficultySchema } from "../dto/difficultyDto.js";
import { qidSchema } from "../dto/qidDto.js";
import { getQuestionService, getQuestionByIdService, getQuestionServiceWithBlackList, getQuestionByDifficultyService, getAllQuestionsService } from "../service/questionService.js";

export const handleGetQuestion = (req, res) => {
	try {
		getQuestionService().then((question) => {
			if (!question) {
				return res.status(400).json({ message: "Failed to retrieve question" });
			}
			return res.status(200).json({
				message: "Retrieved question successfully",
				question: question,
			});
		});
	} catch (err) {
		console.error("Error: ", err);
		return res.status(500).json({ message: "An error occured, please try again later." });
	}
};

export const handleGetQuestionById = (req, res) => {
	try {
		const { error, value } = qidSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.message });
		}

		const { questionId } = value;

		getQuestionByIdService(questionId).then((question) => {
			if (!question) {
				return res.status(400).json({ message: "Failed to retrieve question" });
			}
			return res.status(200).json({
				message: "Retrieved question successfully",
				question: question,
			});
		});
	} catch (err) {
		console.error("Error: ", err);
		return res.status(500).json({ message: "An error occured, please try again later." });
	}
};

export const handleGetQuestionWithBlackList = (req, res) => {
	try {
		const { error, value } = blackListSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.message });
		}
		const { list, difficulty } = value;

		getQuestionServiceWithBlackList(list, difficulty).then((question) => {
			if (!question) {
				return res.status(400).json({ message: "Failed to retrieve question" });
			}
			return res.status(200).json({
				message: "Retrieved question successfully",
				question: question,
			});
		});
	} catch (err) {
		console.error("Error: ", err);
		return res.status(500).json({ message: "An error occured, please try again later." });
	}
};

export const handleGetQuestionByDifficulty = (req, res) => {
	try {
		const { error, value } = difficultySchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.message });
		}

		const { difficulty } = value;

		getQuestionByDifficultyService(difficulty).then((question) => {
			if (!question) {
				return res.status(400).json({ message: "Failed to retrieve question" });
			}
			return res.status(200).json({
				message: "Retrieved question successfully",
				question: question,
			});
		});
	} catch (err) {
		console.error("Error: ", err);
		return res.status(500).json({ message: "An error occured, please try again later." });
	}
};

export const handleGetAllQuestions = (req, res) => {
	try {
		getAllQuestionsService().then((questionList) => {
			if (!questionList) {
				return res.status(400).json({ message: "Failed to retrieve question" });
			}
			return res.status(200).json({
				message: "Retrieved question successfully",
				questions: questionList,
			});
		});
	} catch (err) {
		console.error("Error: ", err);
		return res.status(500).json({ message: "An error occured, please try again later." });
	}
};