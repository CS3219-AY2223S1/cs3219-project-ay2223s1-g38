import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import firebase from "firebase/app"; 
import firebaseConfig from "./services/firebaseConfig";

import SignupPage from "./components/pages/SignupPage";
import LoginPage from "./components/pages/LoginPage";
import { selectIsUserLoggedIn } from "./features/user/userSlice";
import HomePage from "./components/pages/HomePage";
import CollabPage from "./components/pages/CollabPage";

const App = () => {
	const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

	// Initialize firebase once 
	useEffect(() => {
		console.log("config: " + firebaseConfig.appId);
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig); 
		} else {
			firebase.app(); 
		}
	}, []);

	return (
		<div className="App">
			<Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
				<Router>
					{ !isUserLoggedIn ? 
						<Routes>
							<Route exact path="/" element={<Navigate replace to="/login" />}/>
							<Route path="/signup" element={<SignupPage/>} />
							<Route path="/login" element={<LoginPage/>} />
							<Route path="/collab" element={<CollabPage/>} />
						</Routes>
						: 
						<Routes>
							<Route path="/login" element={<HomePage/>} />
							<Route path="/collab" element={<CollabPage/>} />
						</Routes>
					}
				</Router>
			</Box>
		</div>
	);
};

export default App;
