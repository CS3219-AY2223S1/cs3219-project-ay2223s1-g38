import React, { useState, useRef, useEffect } from "react";

import { fromMonaco } from "@hackerrank/firepad"; 
import Editor from "@monaco-editor/react"; 
import { Box } from "@mui/system";
import firebase from "firebase/app";
 
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import socketIO from "socket.io-client";

import Question from "../components/Question";
import { URI_SESSION_SVC } from "../config/config";
import { selectRoomId } from "../features/match/matchSlice";
import { selectQuestionId } from "../features/session/sessionSlice";
import { selectUsername } from "../features/user/userSlice";
import { listenSession } from "../utils/eventHandlers";
import { joinSession } from "../utils/socket";


const CollabPage = () => {

	const socket = socketIO.connect(URI_SESSION_SVC);
	listenSession(socket);

	// eslint-disable-next-line no-unused-vars
	const roomId = useSelector(selectRoomId);
	const questionId = useSelector(selectQuestionId);
	
	joinSession(socket, "test");

	const editorRef = useRef(null);
	const [ editorLoaded, setEditorLoaded ] = useState(false); 
	const username = useSelector(selectUsername);
	const navigate = useNavigate();
    
	// eslint-disable-next-line no-unused-vars
	const handleEditorDidMount = (editor, _monaco) => {
		if (!editorLoaded) {
			editorRef.current = editor; 
			setEditorLoaded(true);
		} 
	};

	useEffect(() => {
		if (!editorLoaded) {
			return; 
		} 

		// TODO: update this to fit MatchID
		const dbRef = firebase.database().ref().child("test"); 
		const firepad = fromMonaco(dbRef, editorRef.current); 

		firepad.setUserName(username); 
	}, [ editorLoaded ]);

	useEffect(() => {
		if (roomId === "") {
			setTimeout(() => navigate("/home"), 1000);
		}
	}, [ roomId ]);
	
	return <div>
		<Box sx={{ display: "flex", direction: "row", height:"100%" }}>
			<Question questionId={questionId} socket={socket}/>
			<Box sx={{ width:"55%", height:"100vh" }}>
				<Editor 
					defaultLanguage="java"
					theme="vs-dark"
					defaultValue="// Begin your Algohike here!"
					onMount={handleEditorDidMount}
				/>
			</Box>
		</Box>
	</div>;
};

export default CollabPage;