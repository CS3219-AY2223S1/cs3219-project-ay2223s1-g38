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
	// let navigate = useNavigate();

	const { handleOpenModal } = props;
	return (
		<Card sx={{ borderRadius: 8 }}>
			<CardHeader
				title={"Difficulty"}
				subheader={"Time?"}
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
                      Description
					</Typography>
				</Box>
			</CardContent>
			<CardActions>
				<Button fullWidth sx={{ color: "black" }} onClick={() => {
					// TODO send request to search for match
					handleOpenModal();
					// navigate("/countdown", { replace: true });
				}}>
					{"Start"}
				</Button>
			</CardActions>
		</Card>
	);
};

QuestionCard.propTypes = {
	handleOpenModal: PropTypes.func,
};

export default QuestionCard;
