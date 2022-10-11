import React, { useState } from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link as RRLink, useNavigate } from "react-router-dom";

import { URL_LOGIN_SVC } from "../config/config";
import firebaseAuth from "../config/firebase";
import backgroundImage from "../static/algohike.jpg";
import { STATUS_CODE_INVALID_EMAIL, STATUS_CODE_MANY_REQ, STATUS_CODE_NOT_FOUND, STATUS_CODE_WRONG_PASSWORD } from "../utils/constants";

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
			const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
			const user = userCredential.user;
			const token = await user.getIdToken();
			await axios.post(URL_LOGIN_SVC, {}, { headers: { Authorization: `Bearer ${token}` } });
			// const userData = res.data.user;
			// dispatch(setUsername({ username: userData.username }));
			navigate("/home");
		} catch (err) {
			const errorCode = err.code;
			console.log(err.code);
			if (errorCode == STATUS_CODE_WRONG_PASSWORD) {
				setPasswordError("Invalid password.");
			} else if (errorCode == STATUS_CODE_INVALID_EMAIL) {
				setEmailError("Invalid email");
			} else if (errorCode == STATUS_CODE_NOT_FOUND) {
				setEmailError("User does not exist");
			} else if (errorCode == STATUS_CODE_MANY_REQ) {
				setGeneralError("Too many repeated attempts, please try again later.");
			}
		}
	};

	return (
		<Grid container component="main" xs={{ height: "100vh" }} sx={{ height: "100vh", padding: "4rem" }}>
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
								{/* <Link href="#" variant="body2">
                    Forgot password?
									</Link> */}
							</Grid>
							<Grid item>
								<RRLink to='/signup'>
									<Link href="#" variant="body2">
										{"Don't have an account? Sign Up"}
									</Link>
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