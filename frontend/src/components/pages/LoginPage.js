import React from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link as RRLink } from "react-router-dom";

import { URL_LOGIN_SVC } from "../../configs";
import { STATUS_CODE_SUCCESS } from "../../constants";
import { login } from "../../features/user/userSlice";
import backgroundImage from "../../static/algohike.jpg";


const LoginPage = () => {
	const dispatch = useDispatch(); 

	const handleLogin = async (event) => {
		event.preventDefault(); 
		const data = new FormData(event.currentTarget);
		const username = data.get("username");
		const password = data.get("password");
		const res = await axios.post(URL_LOGIN_SVC, { username, password }).catch(err => console.log(err, "failed")); 

		if (res && res.status === STATUS_CODE_SUCCESS ) {
			dispatch(login());
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
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
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
								<Link href="#" variant="body2">
                    Forgot password?
								</Link>
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

	);};

export default LoginPage;
