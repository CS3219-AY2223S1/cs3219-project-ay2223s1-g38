import React from "react";

import { Box, Container, Grid, Modal, Typography } from "@mui/material";

import { PropTypes } from "prop-types";

import CountdownTimer from "../components/CountdownTimer";
import CustomAppBar from "../components/CustomAppBar";
import QuestionCard from "../components/QuestionCard";

const HomePage = (props) => {

	const { socket } = props;

	const [ open, setOpen ] = React.useState(false);
	const handleOpenCountdownModal = () => setOpen(true);
	const handleCloseCountdownModal = () => setOpen(false);
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
					<CountdownTimer handleCloseCountdownModal={handleCloseCountdownModal} socket={socket}/>	
				</Box>
			</Modal>
			<Container>
				<Typography sx={{ mx: "auto", my: "5rem" }} variant="h2" align="center">
					Pick a Difficulty!
				</Typography>
				<Grid container spacing={5} sx={{ mt: "2rem", paddingX: "2rem", alignItems: "center", justifyContent: "center", direction: "row" }}>
					<Grid
						item
						xs={12}
						sm={6}
						md={4}
					>
						<QuestionCard handleOpenCountdownModal={handleOpenCountdownModal} socket={socket}/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
						md={4}
					>
						<QuestionCard handleOpenCountdownModal={handleOpenCountdownModal} socket={socket}/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
						md={4}
					>
						<QuestionCard handleOpenCountdownModal={handleOpenCountdownModal} socket={socket}/>
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

HomePage.propTypes ={
	socket: PropTypes.any,
};

export default HomePage;