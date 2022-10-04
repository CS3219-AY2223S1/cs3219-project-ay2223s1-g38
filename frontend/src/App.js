import React from "react";

import { Box, ThemeProvider } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader";

import firebaseAuth from "./config/firebase";
import { globalTheme } from "./globalTheme";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const App = () => {
	const [ user, loading ] = useAuthState(firebaseAuth);
	if (loading) {
		return <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
			<ClipLoader color="teal" size="100"></ClipLoader>
		</Box>;
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
							</Routes>
							:
							<Routes>
								<Route exact path="/" element={<Navigate replace to="/home" />}/>
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
