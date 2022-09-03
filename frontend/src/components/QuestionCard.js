import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";


const QuestionCard = () => {
	return (
		<Card sx={{ borderRadius: 8 }}>
			<CardHeader
				title={"Difficulty"}
				subheader={"Time?"}
				titleTypographyProps={{ align: "center" }}
				subheaderTypographyProps={{
					align: "center",
				}}
				sx={{
					backgroundColor: (theme) =>
						theme.palette.mode === "light"
							? theme.palette.grey[200]
							: theme.palette.grey[700],
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
				<Button fullWidth>
					{"Start"}
				</Button>
			</CardActions>
		</Card>
	);
};

export default QuestionCard;
