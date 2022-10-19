import React from "react";

import { Box, ThemeProvider } from "@mui/material";
// import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { ClipLoader } from "react-spinners";

import socketIO from "socket.io-client";

import { URI_MATCHING_SVC } from "./config/config";
import firebaseApp from "./config/firebase";
import { setUserId, setUsername } from "./features/user/userSlice";

import { globalTheme } from "./globalTheme";
import CollabPage from "./pages/CollabPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import ProfilePage from "./pages/ProfilePage";

import SignupPage from "./pages/SignupPage";
import { listenMatch } from "./utils/eventHandlers";

const App = () => {
	const [ user, loading ] = useAuthState(firebaseApp.auth());
	const dispatch = useDispatch();

	if (loading) {
		return <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
			<ClipLoader color="teal" size="100px"></ClipLoader>
		</Box>;
	} else if (user) {
		dispatch(setUsername({ username: user.displayName }));
		dispatch(setUserId({ userId: user.uid }));
	}

	const socket = socketIO.connect(URI_MATCHING_SVC);
	listenMatch(socket);

	// TODO: remove Collab from non-auth path when user auth works
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
								<Route
									path="*"
									element={<Navigate to="/" replace />}
								/>
							</Routes>
							:
							<Routes>
								<Route exact path="/" element={<Navigate replace to="/home" />}/>
								<Route path="/profile" element={<ProfilePage/>} />
								<Route path="/home" element={<HomePage socket={socket} />} />
								<Route path="/collab" element={<CollabPage/>} />
								<Route
									path="*"
									element={<Navigate to="/" replace />}
								/>
							</Routes>
						}
					</Router>
				</Box>
			</ThemeProvider>
		</div>
	);
};

export default App;
