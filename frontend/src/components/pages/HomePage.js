import React, { Fragment }  from "react";

import { Container, Grid, Typography } from "@mui/material";

import CustomAppBar from "../CustomAppBar";
import QuestionCard from "../QuestionCard";



const HomePage = () => {
	return (
		<>
			<CustomAppBar/>
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
						<QuestionCard/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
						md={4}
					>
						<QuestionCard/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
						md={4}
					>
						<QuestionCard/>
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default HomePage;