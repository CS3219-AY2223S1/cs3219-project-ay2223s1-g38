import React, { useState, useEffect } from "react";

import { CardHeader, Paper, Typography } from "@mui/material";
import axios from "axios";

import { URL_GET_QUESTION_SVC } from "../configs";
import { STATUS_CODE_SUCCESS } from "../constants";

const Question = () => {
	const [ question, setQuestion ] = useState(null); 
	const [ questionTitle, setQuestionTitle ] = useState(null);
	const [ questionDifficulty, setQuestionDifficulty ] = useState("");
	const [ questionError, setQuestionError ] = useState(null);

	const getQuestion = async () => {
		const res = await axios.get(URL_GET_QUESTION_SVC)
			.catch(() => {
				setQuestionError("Error retrieving question");
			});
		if (res && res.status === STATUS_CODE_SUCCESS) {
			setQuestionError(null);
			setQuestionTitle(res.data.question.title);
			setQuestion(res.data.question.content);
			setQuestionDifficulty(res.data.question.difficulty);
		}
	};

	useEffect(() => {
		getQuestion();
	}, []);

	return (
		<Paper>
			<CardHeader
				title={questionTitle}
				subheader={questionDifficulty}
				titleTypographyProps={{ align: "center" }}
				subheaderTypographyProps={{
					align: "center",
				}}
				sx={{
					backgroundColor: (theme) =>
						theme.palette.secondary.dark
				}} />
			<Typography style={{ whiteSpace: "pre-line" }} sx={{ margin: "10px" }}>
				{question}
			</Typography>
			<Typography>
				{questionError}
			</Typography>
		</Paper>
	);
};

export default Question;
