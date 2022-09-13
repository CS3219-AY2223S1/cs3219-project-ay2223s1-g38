import React from "react";

import { Box, Container, Grid, Modal, Typography } from "@mui/material";

import CountdownTimer from "../components/CountdownTimer";
import CustomAppBar from "../components/CustomAppBar";
import QuestionCard from "../components/QuestionCard";

const HomePage = () => {
	const [ open, setOpen ] = React.useState(false);
	const handleOpenModal = () => setOpen(true);
	const handleCloseModal = () => setOpen(false);
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
					<CountdownTimer handleCloseModal={handleCloseModal}/>	
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
						<QuestionCard handleOpenModal={handleOpenModal}/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
						md={4}
					>
						<QuestionCard handleOpenModal={handleOpenModal}/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
						md={4}
					>
						<QuestionCard handleOpenModal={handleOpenModal}/>
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default HomePage;