import React, { useState } from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import firebase from "firebase";
import { Link as RRLink, useNavigate } from "react-router-dom";

import { URL_CREATE_USER_SVC } from "../config/config";
import { FIREBASE_BADLY_FORMATTED_EMAIL, FIREBASE_EMAIL_IN_USE, MSG_BADLY_FORMATTED_EMAIL, MSG_EMAIL_IN_USE } from "../utils/constants";
import { passwordValidate } from "../utils/validation";

export default function SignUp() {
	const navigate = useNavigate(); 
	const [ emailError, setEmailError ] = useState(null); 
	const [ passwordError, setPasswordError ] = useState(null); 
	const [ confirmPasswordError, setConfirmPasswordError ] = useState(null);
	const [ usernameError, setUsernameError ] = useState(null);
	const [ generalError, setGeneralError ] = useState(null);

	const handleSignup = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const email = data.get("email"); 
		const password = data.get("password");
		const confirmPassword = data.get("confirmPassword");
		const username = data.get("username");

		const passwordError = passwordValidate(password);

		if (!email) {
			setEmailError("Email cannot be empty."); 
			return; 
		}

		if (passwordError) {
			setPasswordError(passwordError);
			return;
		}

		if (confirmPassword !== password) {
			setConfirmPasswordError("Passwords must match.");
			return;
		}

		if (!username) {
			setUsernameError("Username cannot be empty.");
			return;
		}

		let user;

		try {
			const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
			user = userCredential.user;
			firebase.auth().currentUser.updateProfile({
				displayName: username
			});
			await axios.post(URL_CREATE_USER_SVC, { uid: user.uid, username });
			navigate("/");
		} catch (err) {
			const errorCode = err.code;
			console.debug("Error occurred: " + err.message);
			if (errorCode == FIREBASE_EMAIL_IN_USE) {
				setEmailError(MSG_EMAIL_IN_USE);
			} else if (errorCode == FIREBASE_BADLY_FORMATTED_EMAIL) {
				setEmailError(MSG_BADLY_FORMATTED_EMAIL); 
			} else {
				setGeneralError(err.response.data.message);
				await user.delete();
			}
		}
	};

	return (
		<Container component="main" maxWidth="sm">
			<CssBaseline />
			<Box
				component={Paper}
				elevation={6}
				sx={{
					borderRadius: 8,
					padding: 10,
					marginTop: 10,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
            Sign up
				</Typography>
				<Box component="form" noValidate onSubmit={handleSignup} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								error={emailError != null}
								helperText={emailError}
								required
								fullWidth
								id="email"
								label="Email"
								name="email"
								autoComplete="email"
								onChange={() => setEmailError(null)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								error={passwordError != null}
								helperText={passwordError}
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="new-password"
								onChange={() => setPasswordError(null)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								error={confirmPasswordError != null}
								helperText={confirmPasswordError}
								required
								fullWidth
								name="confirmPassword"
								label="Confirm Password"
								type="password"
								id="confirmPassword"
								onChange={() => setConfirmPasswordError(null)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								error={usernameError != null}
								helperText={usernameError}
								required
								fullWidth
								name="username"
								label="Username"
								type="username"
								id="username"
								autoComplete="username"
								onChange={() => setUsernameError(null)}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
              Sign Up
					</Button>
					<Typography sx = {{ ml: 2 }} variant="body2" color={"error"}>{ generalError }</Typography>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<RRLink to='/login'>
								<Typography variant="body2">
					Already have an account? Sign in
								</Typography>
							</RRLink>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}