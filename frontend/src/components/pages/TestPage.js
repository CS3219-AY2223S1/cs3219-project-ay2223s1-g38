import React, { Fragment }  from "react";

import { Container } from "@mui/material";

import { Box } from "@mui/system";

import CustomAppBar from "../CustomAppBar";
import Question from "../Question";




const TestPage = () => {
	return (
		<>
			<CustomAppBar/>
			<Container>
				<Box mt={6}>
					<Question />
				</Box>
			</Container>
		</>
	);
};

export default TestPage;