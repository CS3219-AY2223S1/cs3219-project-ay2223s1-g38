import React, { useEffect } from "react";

import { Box } from "@mui/system";

import firebase from "firebase";

const LogoutPage = () => {
	const handleLogout = () => {
		firebase.auth().signOut().then(() => {
			console.debug("User signed out successfully");
		}).catch((error) => {
			console.debug(error);
		});
	};

	useEffect(() => {
		handleLogout();
	}, [ ]);
	return (
		<Box>
			<p>Successfully logged out!</p>
		</Box>
	);
};

export default LogoutPage;