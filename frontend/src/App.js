import React from "react";

import { Box, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import socketIO from "socket.io-client";

import { URI_MATCHING_SVC } from "./configs";
import { selectIsUserLoggedIn } from "./features/user/userSlice";
import { globalTheme } from "./globalTheme";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const socket = socketIO.connect(URI_MATCHING_SVC);

const App = () => {
	const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

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
								<Route path="/home" element={<HomePage socket={socket}/>} />
							</Routes>
							: 
							<Routes>
								<Route path="/home" element={<HomePage/>} />
							</Routes>
						}
					</Router>
				</Box>
			</ThemeProvider>
		</div>
	);
};

export default App;
