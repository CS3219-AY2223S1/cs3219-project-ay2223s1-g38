import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react"; 
import { fromMonaco } from "@hackerrank/firepad"; 
import firebase from "firebase/app"; 

const CollabPage = () => {
	const editorRef = useRef(null);
	const [ editorLoaded, setEditorLoaded ] = useState(false); 
    
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
		const dbRef = firebase.database().ref().child("pair001"); 
		const firepad = fromMonaco(dbRef, editorRef.current); 

		// const name = prompt("Enter your name: "); 
		firepad.setUserName("Hello world"); 
	}, [ editorLoaded ]);

	return <div>
		<Editor 
			height="90vh"
			defaultLanguage="java"
			theme="vs-dark"
			defaultValue="// Begin your Algohike here!"
			onMount={handleEditorDidMount}
		/>
	</div>;
};

export default CollabPage;