/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

import { Grid } from "@mui/material";
import { useSelector } from "react-redux";


import { selectUsername } from "../../features/user/userSlice";

import MessageInput from "../molecules/MessageInput";
 
import MessageList from "../molecules/MessageList"; 

const Messager = ({ chatSocket }) => {
	const roomId = "dummyroom"; 
	const currUsername = useSelector(selectUsername);

	const [ messages, setMessages ] = useState([]); 

	useEffect(() => {

		chatSocket.on("receive_message", (data) => {
			const { message, username, date } = data;  
			const isLeft = username !== currUsername; 
			setMessages(state => [
				...state, 
				{
					position:isLeft ? "left" : "right",
					title: username,
					type: "text", 
					text: message,
					date: date
				},
			]);
		});

		return () => {
			chatSocket.off("receive_message");
		};
	}, [ chatSocket ]);

	useEffect(() => {
		joinChatRoom(); 
	}, []);

	const emitMessage = (msg) => { 
		if (msg && msg.length > 0) {
			chatSocket.emit("send_message", { msg, username: currUsername, roomId });
		}
	};

	const joinChatRoom = () => {
		chatSocket.emit("join_chatroom", { username: currUsername, roomId }); 
	};

	return <Grid container direction="column">
		<Grid item>
			<MessageList messages={messages} /> 
		</Grid>
		<Grid item>
			<MessageInput onSend={msg => emitMessage(msg)} />
		</Grid>
	</Grid>;
};

export default Messager; 
