import React, { useState, useRef, useEffect } from "react";

import { fromMonaco } from "@hackerrank/firepad"; 
import Editor from "@monaco-editor/react"; 
import { Box } from "@mui/system";
import firebase from "firebase/app";
 
import { useSelector } from "react-redux";

import Question from "../components/Question";
import { selectUsername } from "../features/user/userSlice";

const CollabPage = () => {
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

	return <div>
		<Box sx={{ display: "flex", direction: "row", height:"100%" }}>
			<Question />
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