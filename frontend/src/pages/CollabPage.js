import React, { useState, useRef, useEffect } from "react";

import { fromMonaco } from "@hackerrank/firepad"; 
import Editor from "@monaco-editor/react"; 
import { Grid, Paper } from "@mui/material";
import firebase from "firebase/app";
 
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import socketIO from "socket.io-client";

import Messager from "../components/organisms/Messager";
import Question from "../components/Question";
import { URI_SESSION_SVC } from "../config/config";
import { selectRoomId } from "../features/match/matchSlice";
import { selectQuestionId } from "../features/session/sessionSlice";
import { selectUsername } from "../features/user/userSlice";
import { listenSession } from "../utils/eventHandlers";
import { joinSession } from "../utils/socket";


// eslint-disable-next-line react/prop-types
const CollabPage = ({ chatSocket }) => {

	const socket = socketIO.connect(URI_SESSION_SVC);
	listenSession(socket);

	// eslint-disable-next-line no-unused-vars
	const roomId = useSelector(selectRoomId);
	const questionId = useSelector(selectQuestionId);
	
	joinSession(socket, roomId);

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
		const dbRef = firebase.database().ref().child(roomId); 
		const firepad = fromMonaco(dbRef, editorRef.current); 

		firepad.setUserName(username); 
	}, [ editorLoaded ]);

	useEffect(() => {
		if (roomId === "") {
			setTimeout(() => navigate("/home"), 1000);
		}
	}, [ roomId ]);
	
	return <>
		<Grid container direction="row" alignItems="stretch" justifyContent="center">
			<Grid item xs={3} style={{ padding: 5 }}>
			<Question questionId={questionId} socket={socket}/>
			</Grid>
			<Grid item xs={6} style={{ padding: 5 }}>
				<Paper elevation={10} style={{ height: "100vh" }}>
					<Editor 
						defaultLanguage="java"
						theme="vs-light"
						defaultValue="// Begin your Algohike here!"
						onMount={handleEditorDidMount}
					/>
				</Paper>
			</Grid>
			<Grid item xs={3}>
				<Paper style={{ height: "100vh" }}>
					<Messager chatSocket={chatSocket} />
				</Paper>
			</Grid>
		</Grid>
	</>;
};

export default CollabPage;