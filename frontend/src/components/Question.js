import React, { useState, useEffect } from "react";

import { Button, CardHeader, CircularProgress, IconButton, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";

import { URL_GET_QUESTION_SVC, URL_GET_QUESTION_WITH_BLACKLIST_SVC } from "../configs";
import { STATUS_CODE_SUCCESS } from "../constants";



const Question = () => {
	const [ question, setQuestion ] = useState(null); 
	const [ questionTitle, setQuestionTitle ] = useState(null);
	const [ questionDifficulty, setQuestionDifficulty ] = useState("");
	const [ questionError, setQuestionError ] = useState(null);
	const [ isQuestionLoading, setIsQuestionLoading ] = useState(false);
	let list = [];

	const getQuestion = async () => {
		question;
		setIsQuestionLoading(true);
		const res = await axios.get(URL_GET_QUESTION_SVC)
			.catch(() => {
				setQuestionError("Error retrieving question, please try again later");
			});
		if (res && res.status === STATUS_CODE_SUCCESS) {
			setQuestionError(null);
			setQuestionTitle(res.data.question.title);
			console.log(res.data.question.content);
			setQuestion(res.data.question.content);
			setQuestionDifficulty(res.data.question.difficulty);
		}
		setIsQuestionLoading(false);
	};

	const getQuestionWithBlackList = async (list) => {
		setIsQuestionLoading(true);
		const res = await axios.post(URL_GET_QUESTION_WITH_BLACKLIST_SVC, { "list" : list })
			.catch(() => {
				setQuestionError("Error retrieving question, please try again later");
			});
		if (res && res.status === STATUS_CODE_SUCCESS) {
			setQuestionError(null);
			setQuestionTitle(res.data.question.title);
			console.log(res.data.question.content);
			setQuestion(res.data.question.content);
			setQuestionDifficulty(res.data.question.difficulty);
		}
		setIsQuestionLoading(false);
	};

	useEffect(() => {
		getQuestion();
	}, []);

	return (
		<Paper sx={{ width:"45%", height:"100%" }}>
			<CardHeader
				action={
					<IconButton aria-label="settings" onClick={() => getQuestionWithBlackList(list)}>
						<Button variant="outlined">Next Question</Button>
					</IconButton>
				}
				title={questionTitle}
				subheader={questionDifficulty}
				titleTypographyProps={{ align: "center" }}
				subheaderTypographyProps={{
					align: "center",
				}}
				sx={{
					height: "9vh",
					backgroundColor: (theme) =>
						theme.palette.secondary.dark
				}} />

			{isQuestionLoading ? <Box sx={{ marginLeft: "50%" }}><CircularProgress sx={{ py: 2 }} /></Box> :
				<Box sx={{ overflow: "auto", maxHeight:"86vh" }}>
					<Typography sx={{ margin: "10px", color: "red" }} variant="h6">
						{questionError}
					</Typography>
					<Typography style={{ whiteSpace: "pre-line" }} sx={{ margin: "10px" }}>
						{question};
					</Typography>
				</Box>
			}
		</Paper>
	);
};

export default Question;
