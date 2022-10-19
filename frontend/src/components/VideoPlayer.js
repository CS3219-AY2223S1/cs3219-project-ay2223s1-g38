/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";

import Peer from "peerjs";
import { useSelector } from "react-redux";

import { selectUserId, selectUsername } from "../features/user/userSlice";

const VideoPlayer = ({ chatSocket }) => {
	const [ callAccepted, setCallAccepted ] = useState(false);
	const[ callEnded, setCallEnded ] = useState(false);
	const [ name, setName ]= useState("");
	const [ call, setCall ] = useState("");
	const [ me, setMe ] = useState("");
	const [ stream, setStream ] = useState();
	// const [ peer, setPeer ] = useState();
	const myVideo = useRef();
	const peerVideo = useRef();
	const roomId = "dummyroom";
	const username = useSelector(selectUsername);
	const userId = useSelector(selectUserId);
	const myPeer = new Peer(userId);

	useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				setStream(stream);
				myVideo.current.srcObject = stream;
				chatSocket.emit("join_video_room",{ roomId, userId });
				myPeer.on("call", call => {
					call.answer(stream);
					call.on("stream", userVideoStream => { // When we recieve their stream
						peerVideo.current.srcObject = userVideoStream;
					});
				});
  
				chatSocket.on("user-connected", userId => { // If a new user connect
					console.log(`${userId} CONNECTED`);
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
			console.log("connectoin close");
		});
	}

	return <>
		<div>video</div>
		<div>
			<video ref={myVideo} autoPlay />
		</div>
		<div>
			<video ref={peerVideo} autoPlay />
		</div>

	</>;
};

export default VideoPlayer;