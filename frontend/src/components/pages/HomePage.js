/* eslint-disable no-unused-vars */
import { Container, Grid } from "@mui/material";
import React, { Fragment } from "react";
import CustomAppBar from "../CustomAppBar";
import QuestionCard from "../QuestionCard";


const HomePage = () => {
	return (
		<>
			<CustomAppBar/>
			<Grid container spacing={5} sx={{ paddingX: "2rem", alignItems: "center", justifyContent: "center", direction: "row", minHeight: "100vh" }}>
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
		</>
	);
};

export default HomePage;