import React from "react";

import { Box, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import { selectIsUserLoggedIn } from "./features/user/userSlice";
import { globalTheme } from "./globalTheme";


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
								<Route path="/home" element={<HomePage/>} />
							</Routes>
							: 
							<Routes>
								<Route path="/login" element={<HomePage/>} />
							</Routes>
						}
					</Router>
				</Box>
			</ThemeProvider>
		</div>
	);
};

export default App;
