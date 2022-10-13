import React from "react";

import { Button, Grid, Typography } from "@mui/material";

import { PropTypes } from "prop-types";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const CountdownTimer = (props) => {

	const { handleCloseCountdownModal, handleCancel } = props;

	const renderTime = ({ remainingTime }) => {
		return (<Grid container sx={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
			<Typography sx={{ mx: "auto", my: "3rem" }} variant="h1" align="center">
				{remainingTime}
			</Typography>
			<Button variant="outlined" sx={{ color: "black", backgroundColor: "#FFA5A5", fontWeight: "bold" }} onClick={() => {
				handleCancel();
				handleCloseCountdownModal();
			}}>
				{"Cancel"}
			</Button>
		</Grid>
		);
	};

	return (
		<>
			<Grid container component="main" sx={{ alignItems: "center", justifyContent: "center", flexDirection: "column" }} >
				<Typography sx={{ mx: "auto", my: "5rem" }} variant="h3" align="center">
					Finding a match...
				</Typography>
				<Grid sx={{ fontSize: "100px" }}>
					<CountdownCircleTimer
						isPlaying
						duration={30}
						colors={[ "#A4C3B2", "#F7B801", "#A30000", "#A30000" ]}
						size={400}
						colorsTime={[ 7, 5, 2, 0 ]}
						onComplete={handleCloseCountdownModal}
					>
						{renderTime}
					</CountdownCircleTimer>
				</Grid>
			</Grid>
		</>
	);
};

CountdownTimer.propTypes = {
	handleCloseCountdownModal: PropTypes.func,
	handleCancel: PropTypes.func
};

export default CountdownTimer;
