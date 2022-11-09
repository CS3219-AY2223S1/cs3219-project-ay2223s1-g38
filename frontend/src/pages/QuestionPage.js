import React, { useEffect, useState } from "react";

import { Button, CardHeader, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";

import axios from "axios";
import { PropTypes } from "prop-types";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import CustomAppBar from "../components/CustomAppBar";
import QuestionsTable from "../components/QuestionsTable";
import { URL_GET_ALL_QUESTIONS, URL_GET_QUESTION_BY_ID_SVC } from "../config/config";
import { STATUS_CODE_SUCCESS } from "../utils/constants";


import "./pages.scss";

const AllQuestions = () => {
	const [ allQuestionsLoading, setAllQuestionsLoading ] = useState(false);
	const [ questionError, setQuestionError ] = useState(null);
	const [ allQuestions, setAllQuestions ] = useState([]);

	const getAllQuestions = async () => {
		setAllQuestionsLoading(true);
		const res = await axios.get(URL_GET_ALL_QUESTIONS)
			.catch(() => {
				setQuestionError("Error retrieving questions, please try again later");
			});
		if (res && res.status === STATUS_CODE_SUCCESS) {
			setQuestionError(null);
			setAllQuestions(res.data.questions);
		}
		setAllQuestionsLoading(false);
	};

	useEffect(() => {
		getAllQuestions();
	}, [ ]);

	return (
		<Box sx={{ my: 2 }}>
			<Typography sx={{ my: 5 }}  variant="h3" align="center">All Questions</Typography>
			{questionError && <Typography sx={{ margin: "10px", color: "red" }} variant="h6">
				{questionError}
			</Typography>}
			{allQuestionsLoading 
				? <Box sx={{ marginLeft: "50%" }}><CircularProgress sx={{ py: 2 }} /></Box> 
				: <QuestionsTable questions={allQuestions}/>
			}
			
		</Box>
	);
};

const BigQuestion = ({ qid }) => {
	const [ question, setQuestion ] = useState(null); 
	const [ questionTitle, setQuestionTitle ] = useState(null);
	const [ questionDifficulty, setQuestionDifficulty ] = useState("");
	const [ questionError, setQuestionError ] = useState(null);
	const [ isQuestionLoading, setIsQuestionLoading ] = useState(false);

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

	useEffect(() => {
		getQuestionById(qid);
	}, [ qid ]);

	const navigate = useNavigate();

	return (
		<Box sx={{ my:5, display: "flex", justifyContent: "center", width: "90%" }}>
			<Button variant="contained" disabled={qid === "1"} className="question-detailed-button" onClick={() => navigate(`/questions/${parseInt(qid) - 1}`)}>Previous</Button>
			<Box width={"70%"} height={"70%"}>
				<CardHeader
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
						backgroundColor: (theme) =>
							theme.palette.secondary.dark
					}} />

				{isQuestionLoading ? <Box sx={{ marginLeft: "50%" }}><CircularProgress sx={{ py: 2 }} /></Box> :
					<Box sx={{ overflowY: "auto", height: "calc(100% - 130px)" }}>
						<Typography sx={{ margin: "10px", color: "red" }} variant="h6">
							{questionError}
						</Typography>
						<Typography sx={{ margin: "14px" }}>
							<span dangerouslySetInnerHTML={{ __html: question }} />
						</Typography>
					</Box>
				}
			</Box>
			<Button variant="contained" className="question-detailed-button" onClick={() => navigate(`/questions/${parseInt(qid) + 1}`)}>Next Question</Button>
		</Box>
	);
};

BigQuestion.propTypes = {
	qid: PropTypes.string,
};

const QuestionPage = () => {

	let { qid } = useParams();

	return (
		<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
			<CustomAppBar />
			{ qid ? <BigQuestion qid={qid}/> : <AllQuestions/> }
		</Box>
	);
};

export default QuestionPage;