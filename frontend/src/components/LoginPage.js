import React from "react";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Typography
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { URL_LOGIN_SVC } from "../configs";
import { STATUS_CODE_SUCCESS, STATUS_CODE_UNAUTHORIZED } from "../constants";

const LoginPage = () => {
	const [ username, setUsername ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ isDialogOpen, setIsDialogOpen ] = useState(false);
	const [ dialogTitle, setDialogTitle ] = useState("");
	const [ dialogMsg, setDialogMsg ] = useState("");
	const [ isLoginSuccess, setIsLoginSuccess ] = useState(false);
	const [ loggedInUser, setLoggedInUser ] = useState("");

	const handleLogin = async () => {
		setIsLoginSuccess(false);
		const res = await axios.post(URL_LOGIN_SVC, { username, password })
			.catch((err) => {
				if (err.response.status === STATUS_CODE_UNAUTHORIZED) {
					setErrorDialog("Invalid username or password!");
				} else {
					setErrorDialog("Please try again later");
				}
			});
		if (res && res.status === STATUS_CODE_SUCCESS) {
			setSuccessDialog("Successfully logged in!");
			setIsLoginSuccess(true);
			setIsDialogOpen(true);
			setLoggedInUser(res.data.username);
		}
	};

	const closeDialog = () => setIsDialogOpen(false);

	const setSuccessDialog = (msg) => {
		setIsDialogOpen(true);
		setDialogTitle("Success");
		setDialogMsg(msg);
	};

	const setErrorDialog = (msg) => {
		setIsDialogOpen(true);
		setDialogTitle("Error");
		setDialogMsg(msg);
	};

	return (
		<Box display={"flex"} flexDirection={"column"} width={"30%"}>
			<Typography variant={"h3"} marginBottom={"2rem"}>Login</Typography>
			<TextField
				label="Username"
				variant="standard"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				sx={{ marginBottom: "1rem" }}
				autoFocus
			/>
			<TextField
				label="Password"
				variant="standard"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				sx={{ marginBottom: "2rem" }}
			/>
			<Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
				<Button variant={"outlined"} onClick={handleLogin}>Login</Button>
			</Box>

			<Dialog
				open={isDialogOpen}
				onClose={closeDialog}
			>
				<DialogTitle>{dialogTitle}</DialogTitle>
				<DialogContent>
					<DialogContentText>{dialogMsg}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeDialog}>Done</Button>
				</DialogActions>
			</Dialog>
			{isLoginSuccess ? <Typography>Logged in to {loggedInUser}</Typography> : <></>}
		</Box>
	);
};

export default LoginPage;
