import React, { useEffect, useState } from "react";

import { Box, Container, Grid, Modal, Typography } from "@mui/material";

import { PropTypes } from "prop-types";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CountdownTimer from "../components/CountdownTimer";
import CustomAppBar from "../components/CustomAppBar";
import QuestionCard from "../components/QuestionCard";
import { selectRoomId } from "../features/match/matchSlice";
import { cancelMatch, findMatch } from "../utils/socket";

const HomePage = (props) => {

	const { socket } = props;
	
	const roomId = useSelector(selectRoomId);
	const navigate = useNavigate();

	const [ open, setOpen ] = useState(false);
	const [ chosen, setChosen ] = useState("");

	useEffect(() => {
		if (roomId != "") {
			setTimeout(() => navigate("/collab"), 1000);
		}
	}, [ roomId ]);

	const difficulties = [ "EASY", "MEDIUM", "HARD" ];

	const handleOpenCountdownModal = (difficulty) => {
		setChosen(difficulty);
		setOpen(true);
	};

	const handleCloseCountdownModal = () => {
		setChosen("");
		setOpen(false);
	};

	const handleFindMatch = (userId, difficulty) => {
		findMatch(socket, userId, difficulty);
	};

	const handleCancel = () => {
		cancelMatch(socket, 1, chosen);
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
					Pick a Difficulty!
				</Typography>
				<Grid container spacing={5} sx={{ mt: "2rem", paddingX: "2rem", alignItems: "center", justifyContent: "center", direction: "row" }}>
					{difficulties.map((diff) => {
						return (<Grid
							key={`difficulty-box-${diff}}`}
							item
							xs={12}
							sm={6}
							md={4}
						>
							<QuestionCard handleOpenCountdownModal={() => handleOpenCountdownModal(diff)} handleFindMatch={() => handleFindMatch(1, diff)}/>
						</Grid>);
					})}
				</Grid>
			</Container>
		</>
	);
};

HomePage.propTypes ={
	socket: PropTypes.any,
};

export default HomePage;