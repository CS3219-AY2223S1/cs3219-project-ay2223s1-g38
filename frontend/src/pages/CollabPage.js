import React, { useState, useRef, useEffect } from "react";

import { fromMonaco } from "@hackerrank/firepad"; 
import Editor from "@monaco-editor/react"; 
import { Box, Button } from "@mui/material";
import firebase from "firebase/app"; 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Question from "../components/Question";

import { resetRoom, selectRoomId } from "../features/match/matchSlice";

const CollabPage = () => {
	const editorRef = useRef(null);
	const [ editorLoaded, setEditorLoaded ] = useState(false); 

	const dispatch = useDispatch(); 
	const roomId = useSelector(selectRoomId);
	const navigate = useNavigate();
    
	// eslint-disable-next-line no-unused-vars
	const handleEditorDidMount = (editor, _monaco) => {
		if (!editorLoaded) {
			editorRef.current = editor; 
			setEditorLoaded(true);
		} 
	};

	const handleLeaveRoom = () => {
		// TODO: Add code to delete room from CollabService if the last user is leaving.
		dispatch(resetRoom());
		navigate("/home");
	};

	useEffect(() => {
		if (!editorLoaded) {
			return; 
		} 

		const dbRef = firebase.database().ref().child(roomId); 
		const firepad = fromMonaco(dbRef, editorRef.current); 

		// TODO: set this as authenticated user's username 
		firepad.setUserName("Hello world"); 
	}, [ editorLoaded ]);

	return <div>
		<Box sx={{ display: "flex", direction: "row", height:"100%" }}>
			<Question />
			<Box 
				sx={{ 
					position: "absolute", 
					width: "100%", 
					backgroundColor: "rgb(142, 158, 155)", 
					borderTop: "1px solid black",
					boxShadow: 5,
					bottom: "0",
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