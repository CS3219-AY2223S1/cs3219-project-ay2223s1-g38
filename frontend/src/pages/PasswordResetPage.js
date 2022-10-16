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
import firebase from "firebase";
import { Link as RRLink, useNavigate } from "react-router-dom";

import { FIREBASE_NOT_FOUND, MSG_NOT_FOUND } from "../utils/constants";

export default function SignUp() {
	const navigate = useNavigate(); 
	const [ emailError, setEmailError ] = useState(null); 
	
	const handleSignup = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const email = data.get("email"); 

		if (!email) {
			setEmailError("Email cannot be empty."); 
			return; 
		}

		firebase.auth().sendPasswordResetEmail(email)
			.then(() => {
				navigate("/");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.debug(errorMessage);
				if (errorCode == FIREBASE_NOT_FOUND) {
					setEmailError(MSG_NOT_FOUND);
				}
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
          Password reset
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
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
            Send password reset email
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