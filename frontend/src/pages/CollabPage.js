import React, { useState, useRef, useEffect } from "react";

import { fromMonaco } from "@hackerrank/firepad"; 
import Editor from "@monaco-editor/react"; 
import { Grid, Paper } from "@mui/material";
import firebase from "firebase/app";
 
import { useSelector } from "react-redux";

import Messager from "../components/organisms/Messager";
import Question from "../components/Question";
import { selectUsername } from "../features/user/userSlice";

// eslint-disable-next-line react/prop-types
const CollabPage = ({ chatSocket }) => {
	const editorRef = useRef(null);
	const [ editorLoaded, setEditorLoaded ] = useState(false); 
	const username = useSelector(selectUsername);
    
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
		const dbRef = firebase.database().ref().child("pair001"); 
		const firepad = fromMonaco(dbRef, editorRef.current); 

		firepad.setUserName(username); 
	}, [ editorLoaded ]);

	return <>
		<Grid container direction="row" alignItems="stretch" justifyContent="center">
			<Grid item xs={3} style={{ padding: 5 }}>
				<Question />
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