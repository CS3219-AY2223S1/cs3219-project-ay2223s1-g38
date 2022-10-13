import React, { useEffect } from "react";

import { Box, ThemeProvider } from "@mui/material";
import firebase from "firebase/app"; 
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import CollabPage from "./components/pages/CollabPage";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";

import TestPage from "./components/pages/TestPage";
import { selectIsUserLoggedIn } from "./features/user/userSlice";
import { globalTheme } from "./globalTheme";
import firebaseConfig from "./services/firebaseConfig";

const App = () => {
	const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

	// Initialize firebase once 
	useEffect(() => {
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig); 
		} else {
			firebase.app(); 
		}
	}, []);

	// TODO: remove Collab from non-auth path when user auth works
	return (
		<div className="App">
			<ThemeProvider theme={globalTheme}>
				<Box display={"flex"} flexDirection={"column"}>
					<Router>
						{ !isUserLoggedIn ? 
							<Routes>
								<Route exact path="/" element={<Navigate replace to="/login" />}/>
								<Route path="/signup" element={<SignupPage/>} />
								<Route path="/login" element={<LoginPage/>} />
								<Route path="/home" element={<HomePage/>} />
								<Route path="/collab" element={<CollabPage/>} />
								<Route path="/testpage" element={<TestPage/>} />
							</Routes>
							: 
							<Routes>
								<Route path="/login" element={<HomePage/>} />
								<Route path="/collab" element={<CollabPage/>} />
							</Routes>
						}
					</Router>
				</Box>
			</ThemeProvider>
		</div>
	);
};

export default App;
