import React from "react";

import { Typography } from "@mui/material";

import { Container } from "@mui/system";
import { useSelector } from "react-redux";

import CustomAppBar from "../components/CustomAppBar";
import { selectUsername } from "../features/user/userSlice";

const ProfilePage = () => {
	const username = useSelector(selectUsername);
	return (
		<>
			<CustomAppBar />
			<Container sx={{ paddingTop: 5 }}>
				<Typography component="h1" variant="h2">{`Hello, ${username}`}</Typography>
			</ Container>
		</>
	);
};

export default ProfilePage;