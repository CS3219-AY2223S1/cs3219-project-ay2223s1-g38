import React from "react";

import { Box, ThemeProvider } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { ClipLoader } from "react-spinners";

import { io } from "socket.io-client";

import { URI_MATCHING_SVC, URI_CHAT_SVC, URI_SESSION_SVC, URI_VIDEO_SVC } from "./config/config";
import firebaseApp from "./config/firebase";
import { selectUsername, setUserId, setUsername } from "./features/user/userSlice";

import { globalTheme } from "./globalTheme";
import CollabPage from "./pages/CollabPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import { listenMatch } from "./utils/eventHandlers";


const App = () => {
	const [ user, loading ] = useAuthState(firebaseApp.auth());
	const dispatch = useDispatch();
	const username = useSelector(selectUsername);

	if (loading) {
		return <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
			<ClipLoader color="teal" size="100px"></ClipLoader>
		</Box>;
	} else if (user) {
		if (!username) {
			dispatch(setUsername({ username: user.displayName }));
		}
		dispatch(setUserId({ userId: user.uid }));
	}

	const connectMatchSocket = () => {
		const socket = io(URI_MATCHING_SVC);
		listenMatch(socket, dispatch);
		return socket;
	};
	
	const chatSocket = io(URI_CHAT_SVC);
	const videoSocket = io(URI_VIDEO_SVC);
	const sessionSocket = io(URI_SESSION_SVC);

	return (
		<Box className="App">
			<ThemeProvider theme={globalTheme}>
				<Box display={"flex"} flexDirection={"column"} width="100vw">
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
								<Route path="/logout" element={<LogoutPage />}/>
								<Route path="/history" element={<ProfilePage/>} />
								<Route path="/home" element={<HomePage connectMatchSocket={connectMatchSocket} />} />
								<Route path="/collab" element={<CollabPage chatSocket={chatSocket} videoSocket={videoSocket} sessionSocket={sessionSocket}/>} />
								<Route
									path="*"
									element={<Navigate to="/" replace />}
								/>
							</Routes>
						}
					</Router>
				</Box>
			</ThemeProvider>
		</Box>
	);
};

export default App;
