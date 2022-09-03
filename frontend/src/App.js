import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { Box } from "@mui/material";
import { useSelector } from "react-redux";

import SignupPage from "./components/pages/SignupPage";
import LoginPage from "./components/pages/LoginPage";
import { selectIsUserLoggedIn } from "./features/user/userSlice";
import HomePage from "./components/pages/HomePage";

const App = () => {
	const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

	return (
		<div className="App">
			<Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
				<Router>
					{ !isUserLoggedIn ? 
						<Routes>
							<Route exact path="/" element={<Navigate replace to="/login" />}/>
							<Route path="/signup" element={<SignupPage/>} />
							<Route path="/login" element={<LoginPage/>} />
						</Routes>
						: 
						<Routes>
							<Route path="/login" element={<HomePage/>} />
						</Routes>
					}
				</Router>
			</Box>
		</div>
	);
};

export default App;
