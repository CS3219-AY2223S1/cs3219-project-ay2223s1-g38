import React, { useEffect, useState } from "react";

import { Typography } from "@mui/material";
import { Container } from "@mui/system";

import axios from "axios";
import { useSelector } from "react-redux";

import CustomAppBar from "../components/CustomAppBar";
import { URL_GET_HISTORY_BY_UID } from "../config/config";
import { selectUserId, selectUsername } from "../features/user/userSlice";
import { STATUS_CODE_SUCCESS } from "../utils/constants";

const ProfilePage = () => {
	const [ isHistoryLoading, setIsHistoryLoading ] = useState(false);
	const [ historyError, setHistoryError ] = useState("");
	// const [ history, setHistory ] = useState([]);
	const username = useSelector(selectUsername);
	const uid = useSelector(selectUserId);

	const getUserHistory = async () => {
		setIsHistoryLoading(true);
		const res = await axios.post(URL_GET_HISTORY_BY_UID, { uid })
			.catch(() => {
				setHistoryError("Error retrieving user history, please try again later!");
			});
		if (res && res.status === STATUS_CODE_SUCCESS) {
			setHistoryError(null);
			console.log(res);
			// setHistory(res.data.history)
		}
		setIsHistoryLoading(false);
	};

	useEffect(() => {
		getUserHistory();
	}, [ ]);

	return (
		<>
			<CustomAppBar />
			<Container sx={{ paddingTop: 5 }}>
				<Typography component="h1" variant="h2">{`Hello, ${username}`}</Typography>
				{ isHistoryLoading && <p>Loading history</p> }
				{ historyError }
			</ Container>
		</>
	);
};

export default ProfilePage;