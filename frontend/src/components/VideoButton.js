import React from "react";

import { Button } from "@mui/material";
import PropTypes from "prop-types";


const VideoButton = (props) => {
	const { onClickHandler } = props;
	return (
		<Button onClick={onClickHandler}>
			{props.children}
		</Button>
	);
};

export default VideoButton;

VideoButton.propTypes = {
	onClickHandler: PropTypes.func,
	children: PropTypes.any
};