import React, { useEffect, useState } from "react";

import { Box, Container, Grid, Modal, Typography } from "@mui/material";

import { PropTypes } from "prop-types";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CountdownTimer from "../components/CountdownTimer";
import CustomAppBar from "../components/CustomAppBar";
import QuestionCard from "../components/QuestionCard";
import { selectRoomId } from "../features/match/matchSlice";
import { selectUserId } from "../features/user/userSlice";
import mountain from "../static/mountain.png";
import { cancelMatch, findMatch } from "../utils/socket";



const HomePage = ({ connectMatchSocket }) => {
	
	const roomId = useSelector(selectRoomId);
	const userId = useSelector(selectUserId);
	const navigate = useNavigate();

	const [ open, setOpen ] = useState(false);
	const [ chosen, setChosen ] = useState("");

	const [ matchSocket, setMatchSocket ] = useState(null);

	useEffect(() => {
		if (roomId != "") {
			setTimeout(() => navigate("/collab"), 1000);
		}
	}, [ roomId ]);

	const difficulties = [ 
		{
			diff: "EASY",
			description: "Good for practicing your basics. You should aim to complete within 15 minutes."
		}, 
		{
			diff: "MEDIUM",
			description: "A good indicator of the toughness of interview questions. You should aim to complete within 30 minutes."
		}, 
		{
			diff: "HARD",
			description: "These questions are meant to be difficult. You should aim to complete within 45 minutes."
		} 
	];

	const handleOpenCountdownModal = (difficulty) => {
		setChosen(difficulty);
		setOpen(true);
	};

	const handleCloseCountdownModal = () => {
		setChosen("");
		setOpen(false);
	};

	const handleFindMatch = (userId, difficulty) => {
		const socket = connectMatchSocket();
		findMatch(socket, userId, difficulty);
		setMatchSocket(socket);
	};

	const handleCancel = () => {
		cancelMatch(matchSocket, userId, chosen);
		matchSocket.disconnect();
	};

	return (
		<>
			<CustomAppBar/>
			<Modal
				open={open}
				disableEscapeKeyDown={true}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: 400,
					bgcolor: "background.paper",
					borderRadius: 8,
					boxShadow: 24,
					p: 4,
				}
				}>
					<CountdownTimer handleCloseCountdownModal={handleCloseCountdownModal} handleCancel={handleCancel}/>	
				</Box>
			</Modal>
			<Container>
				<Typography sx={{ mx: "auto", my: "5rem" }} variant="h2" align="center">
					Begin your AlgoHike! <img height="50px" src={mountain} />
				</Typography>

				<Grid container spacing={5} sx={{ mt: "2rem", paddingX: "2rem", justifyContent: "center", direction: "row" }}>
					{difficulties.map((elem) => {
						return (<Grid
							key={`difficulty-box-${elem.diff}}`}
							item
							xs={12}
							sm={6}
							md={4}
						>	
							<QuestionCard diff={elem.diff} desc={elem.description} handleOpenCountdownModal={() => handleOpenCountdownModal(elem.diff)} handleFindMatch={() => handleFindMatch(userId, elem.diff)}/>
						</Grid>);
					})}
				</Grid>
			</Container>
		</>
	);
};

HomePage.propTypes = {
	connectMatchSocket: PropTypes.func,
};

export default HomePage;