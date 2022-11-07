import React, { useState } from "react";

import { Videocam, VideocamOff, Mic, MicOff } from "@mui/icons-material";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";

import VideoButton from "./VideoButton";

const VideoButtons = (props) => {
	const { localStream } = props;
	const [ cameraEnabled, setCameraEnabled ] = useState(true);
	const [ micEnabled, setMicEnabled ] = useState(true);

	const handleMicButtonPressed = () => {
		localStream.getAudioTracks()[0].enabled = !micEnabled;
		setMicEnabled(!micEnabled);
	};

	const handleCameraButtonPressed = () => {
		localStream.getVideoTracks()[0].enabled = !cameraEnabled;
		setCameraEnabled(!cameraEnabled);
	};

	return (
		<Grid container sx={{ justifyContent: "center" }}>
			<Grid item>
				<VideoButton onClickHandler={handleMicButtonPressed}>
					{micEnabled ? <Mic></Mic> : <MicOff></MicOff> }
				</VideoButton>
			</Grid>
			<Grid item>
				<VideoButton onClickHandler={handleCameraButtonPressed}>
					{cameraEnabled ? <Videocam></Videocam> : <VideocamOff></VideocamOff> }
				</VideoButton>
			</Grid>
		</Grid>
	);
};

export default VideoButtons;

VideoButtons.propTypes = {
	localStream: PropTypes.any,
};