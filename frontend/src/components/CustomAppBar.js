import React from "react";

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
import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";

import { selectUsername } from "../features/user/userSlice";

import "./style.scss";

const pages = [ 
	{
		name: "Home",
		url: "/home"
	}, 
	{
		name: "My History",
		url: "/history"
	}, 
	{
		name: "Questions",
		url: "/questions"
	},
	{
		name: "Logout",
		url: "/logout"
	} 
];

const CustomAppBar = () => {
	const [ anchorElUser, setAnchorElUser ] = React.useState(null);
	// const navigate = useNavigate();
	const username = useSelector(selectUsername);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
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
						href="/home"
						sx={{
							display: { xs: "none", md: "flex" },
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
            AlgoHike
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent:"center" }}>
						{pages.map((page) => (
							<NavLink
								key={page.name}
								end
								to={page.url}
								className={({ isActive }) => `nav-link${isActive ? " selected" : ""}`}
							>
								{page.name}
							</NavLink>
						))}
					</Box>

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
							{pages.map((page) => (
								<MenuItem key={page.name} sx={{ margin: "10px" }}>
									<NavLink to={page.url} className={({ isActive }) => `nav-link-menu${isActive ? " selected" : ""}`}>
										<Typography textAlign="center">{page.name}</Typography>
									</NavLink>
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
