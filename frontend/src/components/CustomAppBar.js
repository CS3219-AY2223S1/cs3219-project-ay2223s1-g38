import React from "react";

import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import firebaseAuth from "../config/firebase";
import { selectUsername } from "../features/user/userSlice";

const settings = [ "Profile", "Logout" ];

const CustomAppBar = () => {
	const [ anchorElUser, setAnchorElUser ] = React.useState(null);
	const navigate = useNavigate();
	const username = useSelector(selectUsername);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleMenuButton = (setting) => {
		if (setting === "Logout") {
			signOut(firebaseAuth).then(() => {
				console.debug("User signed out successfully");
			}).catch((error) => {
				console.debug(error);
			});
			navigate("/login");
		}
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					{/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
							flexGrow: 1
						}}
					>
            AlgoHike
					</Typography>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt={username} src="/static/images/avatar/2.jpg" />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem key={setting} onClick={handleCloseUserMenu}>
									<Button onClick={() => handleMenuButton(setting)}>
										<Typography textAlign="center">{setting}</Typography>
									</Button>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default CustomAppBar;
