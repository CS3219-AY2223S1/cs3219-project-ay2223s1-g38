import React, { useState } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Link as RRLink } from "react-router-dom";
import axios from "axios";

import backgroundImage from "../../static/algohike.jpg";
import { URL_LOGIN_SVC } from "../../configs";
import { useDispatch } from "react-redux";
import { login } from "../../features/user/userSlice";
import { STATUS_CODE_SUCCESS, STATUS_CODE_UNAUTHORIZED } from "../../constants";

const theme = createTheme();

const LoginPage = () => {
	const dispatch = useDispatch(); 
	const [ usernameError, setUsernameError ] = useState(false); 
	const [ passwordError, setPasswordError ] = useState(false); 

	const handleLogin = async (event) => {
		event.preventDefault(); 
		const data = new FormData(event.currentTarget);
		const username = data.get("username");
		const password = data.get("password");
		if (!username || !password) {
			setUsernameError(!username ? "Username cannot be empty." : null); 
			setPasswordError(!password ? "Password cannot be empty." : null);
			return; 
		}
		const res = await axios.post(URL_LOGIN_SVC, { username, password }).catch(err => {
			if (err.response.status === STATUS_CODE_UNAUTHORIZED) {
				setUsernameError(true); 
				setPasswordError("Invalid username or password."); 
			} else {
				setUsernameError(true); 
				setPasswordError("Something went wrong. Please try again later.");
			}
		}); 
		if (res && res.status === STATUS_CODE_SUCCESS ) {
			dispatch(login());
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Grid container component="main" sx={{ height: "100vh" }}>
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
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
								error={usernameError}
								helperText={usernameError}
								margin="normal"
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								autoComplete="username"
								autoFocus
							/>
							<TextField
								error={passwordError}
								helperText={passwordError}
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
                Sign In
							</Button>
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
		</ThemeProvider>);
};

export default LoginPage;
