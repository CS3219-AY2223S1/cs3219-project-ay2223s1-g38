/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from "react";

import { fromMonaco } from "@hackerrank/firepad"; 
import Editor from "@monaco-editor/react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import firebase from "firebase/app";
 
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import Messager from "../components/Messager";
import Question from "../components/Question";
import VideoPlayer from "../components/VideoPlayer";
import { resetRoom, selectRoomId } from "../features/match/matchSlice";
import { selectQuestionId } from "../features/session/sessionSlice";
import { selectUsername } from "../features/user/userSlice";
import { VideoEvent } from "../utils/constants";
import { ChatEvent } from "../utils/constants";
import { listenSession } from "../utils/eventHandlers";
import { joinSession, leaveSession } from "../utils/socket";



const CollabPage = ({ chatSocket, sessionSocket, videoSocket }) => {

	// eslint-disable-next-line no-unused-vars
	const roomId = useSelector(selectRoomId);
	const questionId = useSelector(selectQuestionId);
	
	const editorRef = useRef(null);
	const [ editorLoaded, setEditorLoaded ] = useState(false); 
	const username = useSelector(selectUsername);
	const navigate = useNavigate();
	const dispatch = useDispatch();
    
	// eslint-disable-next-line no-unused-vars
	const handleEditorDidMount = (editor, _monaco) => {
		if (!editorLoaded) {
			editorRef.current = editor; 
			setEditorLoaded(true);
		} 
	};

	const handleLeaveRoom = () => {
		leaveSession(sessionSocket);
		chatSocket.emit(ChatEvent.LEAVE, { username, roomId });
		videoSocket.emit(VideoEvent.LEAVE, { username, roomId });
		dispatch(resetRoom());
		navigate("/home");
	};

	useEffect(() => {
		if (sessionSocket) {
			listenSession(sessionSocket, dispatch);
			joinSession(sessionSocket, roomId);
		}
	}, [ sessionSocket ]);

	useEffect(() => {
		if (!editorLoaded) {
			return; 
		} 

		// TODO: update this to fit MatchID
		const dbRef = firebase.database().ref().child(roomId); 
		const firepad = fromMonaco(dbRef, editorRef.current); 

		firepad.setUserName(username); 
	}, [ editorLoaded ]);

	useEffect(() => {
		if (roomId === "") {
			setTimeout(() => navigate("/home"), 1000);
		}
	}, [ roomId ]);
	
	return (
		<Box sx={{ margin: 0, padding: 0, display: "flex", flexDirection: "row", width: "100vw", height: "100vh" }}>
			<Box sx={{ display: "flex", flexDirection: "column", width: "40%", height: "100%", padding: 0, margin: 0 }}>
				<Question questionId={questionId} socket={sessionSocket}/>
				<Messager chatSocket={chatSocket} />
			</Box>
			
			<Box sx={{ width: "60%" }}>
				<Editor 
					defaultLanguage="java"
					theme="vs-dark"
					onMount={handleEditorDidMount}
				/>
				<Box 
					sx={{ 
						position: "absolute",  
						top: "0",
						right: "30px"
					}}
					py={2}
				>
					<VideoPlayer videoSocket={videoSocket}></VideoPlayer>
				</Box>
				<Box 
					sx={{ 
						position: "absolute",  
						bottom: "0",
						right: "30px"
					}}
					py={2}
				>
					<Button 
						onClick={handleLeaveRoom}
						variant="outlined" 
						sx={{ marginLeft: 2, color: "white",  backgroundColor: "red", borderColor: "black" }}>
						Leave room
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default CollabPage;