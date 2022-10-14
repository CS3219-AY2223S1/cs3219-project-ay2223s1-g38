/* eslint-disable no-unused-vars */
import React from "react";

import { Box, ThemeProvider } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader";

import firebaseAuth from "./config/firebase";
import { setUsername } from "./features/user/userSlice";

import { globalTheme } from "./globalTheme";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";

const App = () => {
	const [ user, loading ] = useAuthState(firebaseAuth);
	const dispatch = useDispatch();
	if (loading) {
		return <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
			<ClipLoader color="teal" size="100"></ClipLoader>
		</Box>;
	} else if (user) {
		dispatch(setUsername({ username: user.displayName }));
	}
	return (
		<div className="App">
			<ThemeProvider theme={globalTheme}>
				<Box display={"flex"} flexDirection={"column"}>
					<Router>
						{ !user ?
							<Routes>
								<Route exact path="/" element={<Navigate replace to="/login" />}/>
								<Route path="/signup" element={<SignupPage/>} />
								<Route path="/login" element={<LoginPage/>} />
								<Route path="/password-reset" element={<PasswordResetPage/>} />
							</Routes>
							:
							<Routes>
								<Route exact path="/" element={<Navigate replace to="/home" />}/>
								<Route path="/home" element={<HomePage/>} />
								<Route path="/signup" element={<SignupPage/>} />
								<Route path="/profile" element={<ProfilePage/>} />
							</Routes>
						}
					</Router>
				</Box>
			</ThemeProvider>
		</div>
	);
};

export default App;
