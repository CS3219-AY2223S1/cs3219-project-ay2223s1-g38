import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { PropTypes } from "prop-types";


const QuestionCard = (props) => {

	const { handleFindMatch, handleOpenCountdownModal } = props;
	return (
		<Card sx={{ borderRadius: 8, }}>
			<CardHeader
				title={props.diff}
				titleTypographyProps={{ align: "center", color: "white" }}
				subheaderTypographyProps={{
					align: "center",
					color: "white",
				}}
				sx={{
					backgroundColor: (theme) =>
						theme.palette.primary.dark
				}}
			/>
			<CardContent>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "baseline",
						mb: 2,
					}}
				>
					<Typography color="text.primary">
						{props.desc}
					</Typography>
				</Box>
			</CardContent>
			<CardActions>
				<Button fullWidth sx={{ color: "black" }} onClick={() => {
					handleFindMatch();
					handleOpenCountdownModal();
				}}>
					{"Start"}
				</Button>
			</CardActions>
		</Card>
	);
};

QuestionCard.propTypes = {
	diff: PropTypes.string,
	desc: PropTypes.string,
	handleOpenCountdownModal: PropTypes.func,
	handleFindMatch: PropTypes.func
};

export default QuestionCard;
