import React, { useState } from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import firebase from "firebase";
import { Link as RRLink, useNavigate } from "react-router-dom";


import { URL_LOGIN_SVC } from "../config/config";
import backgroundImage from "../static/algohike.jpg";
import { FIREBASE_INVALID_EMAIL, FIREBASE_MANY_REQ, FIREBASE_NOT_FOUND, MSG_INVALID_EMAIL, MSG_MANY_REQ, MSG_NOT_FOUND, MSG_WRONG_PASSWORD, FIREBASE_WRONG_PASSWORD } from "../utils/constants";

// TODO: fix invalid DOM nesting
const LoginPage = () => {
	const navigate = useNavigate();
	const [ emailError, setEmailError ] = useState(null); 
	const [ passwordError, setPasswordError ] = useState(null); 
	const [ generalError, setGeneralError ] = useState(null);

	const handleLogin = async (event) => {
		event.preventDefault(); 
		const data = new FormData(event.currentTarget);
		const email = data.get("email");
		const password = data.get("password");
		if (!email || !password) {
			setEmailError(!email ? "Username cannot be empty." : null); 
			setPasswordError(!password ? "Password cannot be empty." : null);
			return; 
		}

		try {
			const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
			const user = userCredential.user;
			const token = await user.getIdToken();
			await axios.post(URL_LOGIN_SVC, {}, { headers: { Authorization: `Bearer ${token}` } });
			// const userData = res.data.user;
			// dispatch(setUsername({ username: userData.username }));
			console.debug(`User: ${user.displayName} logged in successfully`);
			navigate("/home");
		} catch (err) {
			const errorCode = err.code;
			console.debug(err.message);
			if (errorCode == FIREBASE_WRONG_PASSWORD) {
				setPasswordError(MSG_WRONG_PASSWORD);
			} else if (errorCode == FIREBASE_INVALID_EMAIL) {
				setEmailError(MSG_INVALID_EMAIL);
			} else if (errorCode == FIREBASE_NOT_FOUND) {
				setEmailError(MSG_NOT_FOUND);
			} else if (errorCode == FIREBASE_MANY_REQ) {
				setGeneralError(MSG_MANY_REQ);
			}
		}
	};

	return (
		<Grid container component="main" sx={{ height: "100vh", padding: "4rem" }}>
			<CssBaseline />
			<Grid 
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage: `url(${backgroundImage})`,
					backgroundRepeat: "no-repeat",
					backgroundColor: (t) => 
						t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
					backgroundSize: "cover", 
					backgroundPosition: "center"
				}}
			/>
			<Grid item borderRadius={8} xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
							Sign in
					</Typography>
					<Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
						<TextField
							error={emailError != null}
							helperText={emailError}
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email"
							name="email"
							autoComplete="email"
							onChange={() => setEmailError(null)}
						/>
						<TextField
							error={passwordError != null}
							helperText={passwordError}
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={() => setPasswordError(null)}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
                Sign In
						</Button>
						<Typography sx = {{ ml: 2 }} variant="body2" color={"error"}>{ generalError }</Typography>
						<Grid container>
							<Grid item xs>
								<RRLink to='/password-reset'>
									<Typography variant="body2">
										{"Forgot password?"}
									</Typography>
								</RRLink>
							</Grid>
							<Grid item>
								<RRLink to='/signup'>
									<Typography variant="body2">
										{"Don't have an account? Sign Up"}
									</Typography>
								</RRLink>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};

export default LoginPage;