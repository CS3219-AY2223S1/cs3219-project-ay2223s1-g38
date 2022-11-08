import React, { useRef, useEffect, useState } from "react";

import { Grid } from "@mui/material";
import Peer from "peerjs";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";

import { selectRoomId } from "../features/match/matchSlice";
import { selectUserId } from "../features/user/userSlice";

import { VideoEvent } from "../utils/constants";

import VideoButtons from "./VideoButtons";

const VideoPlayer = ({ videoSocket }) => {
	const myVideo = useRef();
	const peerVideo = useRef();
	const roomId = useSelector(selectRoomId);
	const userId = useSelector(selectUserId);
	const [ localStream, setLocalStream ] = useState(null);
	const myPeer = new Peer(userId);

	useEffect(() => {
		let temp;
		navigator.mediaDevices.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				temp = stream;
				setLocalStream(stream);
				myVideo.current.srcObject = stream;
				myVideo.current.play();
				videoSocket.emit(VideoEvent.JOIN,{ roomId, userId });
				myPeer.on("call", call => {
					call.answer(stream);
					call.on("stream", userVideoStream => { // When we recieve their stream
						peerVideo.current.srcObject = userVideoStream;
						peerVideo.current.play();
					});
				});
  
				videoSocket.on(VideoEvent.CONNECT, userId => { // If a new user connect
					connectToNewUser(userId, stream); 
				});
				
				videoSocket.on(VideoEvent.DISCONNECT, () => {
					peerVideo.current.srcObject = null;
				});

			});

		return () => {
			myPeer.destroy();
			if (temp) {
				temp.getVideoTracks()[0].stop();
				temp.getAudioTracks()[0].stop();
			}
		};
	}, [ videoSocket ]);

	function connectToNewUser(userId, stream) {
		const call = myPeer.call(userId, stream);
		if (call) {
			call.on("stream", userVideoStream => {
				peerVideo.current.srcObject = userVideoStream;
				peerVideo.current.play();
			});
		}
	}

	return <Grid container direction="column" sx={{ alignItems: "flex-end" }} > 
		<Grid item>
			<video style={{ maxWidth: "200px" }} ref={myVideo} muted />
			{localStream && <VideoButtons localStream={localStream}></VideoButtons> }
		</Grid>
		<Grid item>
			<video style={{ maxWidth: "200px" }} ref={peerVideo} />
		</Grid>
	</Grid>;
};

VideoPlayer.propTypes = {
	videoSocket: PropTypes.any
};

export default VideoPlayer;