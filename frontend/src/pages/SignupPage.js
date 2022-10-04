import React, { useState } from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link as RRLink, useNavigate } from "react-router-dom";

import firebaseAuth from "../config/firebase";

export default function SignUp() {
	const navigate = useNavigate(); 
	const [ emailError, setEmailError ] = useState(null); 
	const [ passwordError, setPasswordError ] = useState(null); 
	const [ usernameError, setUsernameError ] = useState(null);

	const handleSignup = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const email = data.get("email"); 
		const password = data.get("password");
		const username = data.get("username");

		if (!email || !password) {
			setEmailError(!email ? "Email cannot be empty." : null); 
			setPasswordError(!password ? "Password cannot be empty." : null);
			setUsernameError(!username ? "Username cannot be empty." : null);
			return; 
		}
		createUserWithEmailAndPassword(firebaseAuth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				updateProfile(user, {
					displayName: username
				});
				// TODO make a call to UserService to create user in MongoDB
				navigate("/login");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log("----------------------------ERROR---------");
				console.log(errorCode);
				console.log(errorMessage);
			});
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
					<Grid container justifyContent="flex-end">
						<Grid item>
							<RRLink to='/login'>
								<Link href="#" variant="body2">
					Already have an account? Sign in
								</Link>
							</RRLink>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}