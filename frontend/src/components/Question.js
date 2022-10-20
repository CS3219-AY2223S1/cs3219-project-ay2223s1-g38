import React, { useState, useEffect } from "react";

import { Button, CardHeader, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";


import { useSelector } from "react-redux";

import { URL_GET_QUESTION_BY_ID_SVC, URL_GET_QUESTION_SVC, URL_GET_QUESTION_WITH_BLACKLIST_SVC } from "../config/config";
import { selectRoomId } from "../features/match/matchSlice";
import { selectDifficulty } from "../features/session/sessionSlice";
import { STATUS_CODE_SUCCESS } from "../utils/constants";
import { updateQuestion } from "../utils/socket";


const Question = (props) => {
	const [ question, setQuestion ] = useState(null); 
	const [ questionTitle, setQuestionTitle ] = useState(null);
	const [ questionDifficulty, setQuestionDifficulty ] = useState("");
	const [ questionError, setQuestionError ] = useState(null);
	const [ isQuestionLoading, setIsQuestionLoading ] = useState(false);
	let list = [];

	// eslint-disable-next-line react/prop-types
	const { questionId, socket } = props;
	const roomId = useSelector(selectRoomId);
	const difficulty = useSelector(selectDifficulty);

	const getQuestion = async () => {
		setIsQuestionLoading(true);
		const res = await axios.get(URL_GET_QUESTION_SVC)
			.catch(() => {
				setQuestionError("Error retrieving question, please try again later");
			});
		if (res && res.status === STATUS_CODE_SUCCESS) {
			setQuestionError(null);
			setQuestionTitle(res.data.question.title);
			setQuestion(res.data.question.content);
			setQuestionDifficulty(res.data.question.difficulty);
		}
		setIsQuestionLoading(false);
	};

	const getQuestionById = async (qid) => {
		setIsQuestionLoading(true);
		const res = await axios.post(URL_GET_QUESTION_BY_ID_SVC, { "questionId" : qid })
			.catch(() => {
				setQuestionError("Error retrieving question, please try again later");
			});
		if (res && res.status === STATUS_CODE_SUCCESS) {
			setQuestionError(null);
			setQuestionTitle(res.data.question.title);
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
		if (questionId===null) {
			getQuestion();
		} else {
			getQuestionById(questionId);
		}
	}, [ questionId ]);

	return (
		<Box width={"100%"} height={"70%"}>
			<CardHeader
				action={
					<Button size="small" variant="contained" aria-label="settings" sx={{ borderRadius: "5px",color: "green",  borderColor: "green" }} onClick={ socket === null ? () => getQuestionWithBlackList(list) : () => updateQuestion(socket, roomId, difficulty)}>
						Next Question
					</Button>
				}
				title={questionTitle}
				subheader={questionDifficulty}
				titleTypographyProps={{ align: "center", fontSize: "20px" }}
				subheaderTypographyProps={{
					align: "center",
					fontSize: "12px"
				}}
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					height: "100px",
					backgroundColor: (theme) =>
						theme.palette.secondary.dark
				}} />

			{isQuestionLoading ? <Box sx={{ marginLeft: "50%" }}><CircularProgress sx={{ py: 2 }} /></Box> :
				<Box sx={{ overflowY: "auto", height: "calc(100% - 130px)" }}>
					<Typography sx={{ margin: "10px", color: "red" }} variant="h6">
						{questionError}
					</Typography>
					<Typography style={{ whiteSpace: "pre-line" }} sx={{ margin: "10px" }}>
						<span dangerouslySetInnerHTML={{ __html: question }} />
					</Typography>
				</Box>
			}
		</Box>
	);
};

export default Question;