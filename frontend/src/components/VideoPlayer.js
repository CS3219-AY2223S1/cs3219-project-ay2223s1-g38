import React, { useRef, useEffect } from "react";

import { Grid } from "@mui/material";
import Peer from "peerjs";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";

import { selectUserId } from "../features/user/userSlice";

const VideoPlayer = ({ chatSocket }) => {
	const myVideo = useRef();
	const peerVideo = useRef();
	const roomId = "dummyroom";
	const userId = useSelector(selectUserId);
	const myPeer = new Peer(userId);

	useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				myVideo.current.srcObject = stream;
				chatSocket.emit("join_video_room",{ roomId, userId });
				myPeer.on("call", call => {
					call.answer(stream);
					call.on("stream", userVideoStream => { // When we recieve their stream
						peerVideo.current.srcObject = userVideoStream;
					});
					call.on("close", () => {
						peerVideo.current.srcObject = null;
						console.log("other peer close");
					});
				});
  
				chatSocket.on("user-connected", userId => { // If a new user connect
					connectToNewUser(userId, stream); 
				});
			});
	}, []);

	function connectToNewUser(userId, stream) {
		const call = myPeer.call(userId, stream);
		call.on("stream", userVideoStream => {
			peerVideo.current.srcObject = userVideoStream;
		});
		call.on("close", () => {
		});
	}

	return <Grid container direction="column">
		<Grid item xs={6}>
			<video style={{ maxHeight:"25vh" }} ref={myVideo} autoPlay muted />
		</Grid>
		<Grid item xs={6}>
			<video style={{ maxHeight:"25vh" }} ref={peerVideo} autoPlay />
		</Grid>
	</Grid>;
};

VideoPlayer.propTypes = {
	chatSocket: PropTypes.any
};

export default VideoPlayer;