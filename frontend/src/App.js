import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import { Box } from "@mui/material";

const App = () => {
	return (
		<div className="App">
			<Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
				<Router>
					<Routes>
						<Route exact path="/"></Route>
						<Route path="/signup" element={<SignupPage/>}/>
						<Route path="/login" element={<LoginPage/>}/>
					</Routes>
				</Router>
			</Box>
		</div>
	);
};

export default App;
