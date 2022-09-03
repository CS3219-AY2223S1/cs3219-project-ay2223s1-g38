import React, { useState } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RRLink, useNavigate } from "react-router-dom";
import axios from "axios";

import { URL_CREATE_USER_SVC } from "../../configs";
import { STATUS_CODE_CONFLICT, STATUS_CODE_CREATED } from "../../constants";

const theme = createTheme();

export default function SignUp() {
	const navigate = useNavigate(); 
	const [ usernameError, setUsernameError ] = useState(null); 
	const [ passwordError, setPasswordError ] = useState(null); 

	const handleSignup = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const username = data.get("username"); 
		const password = data.get("password");

		if (!username || !password) {
			setUsernameError(!username ? "Username cannot be empty." : null); 
			setPasswordError(!password ? "Password cannot be empty." : null);
			return; 
		}
		const res = await axios.post(URL_CREATE_USER_SVC, { username, password })
			.catch((err) => {
				if (err.response.status === STATUS_CODE_CONFLICT) {
					setUsernameError("Username already exists.");
				} else {
					setUsernameError(""); 
					setPasswordError("Something went wrong. Please try again later.");
				}
			});
		if (res && res.status === STATUS_CODE_CREATED) {
			navigate("/login");
		}
	};

	return (
		<ThemeProvider theme={theme}>
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
									error={usernameError != null}
									helperText={usernameError}
									required
									fullWidth
									id="username"
									label="Username"
									name="username"
									autoComplete="username"
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
		</ThemeProvider>
	);
}