/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

import { Grid } from "@mui/material";
import { Box } from "@mui/system";

import { useSelector } from "react-redux";

import { selectRoomId } from "../../features/match/matchSlice";
import { selectUsername } from "../../features/user/userSlice";

import { convertToMessageBoxFields } from "../../utils/utils";
import MessageInput from "../molecules/MessageInput";
 
import ChatBox from "../molecules/MessageList"; 

const Messager = ({ chatSocket }) => {
	const roomId = useSelector(selectRoomId); 
	const currUsername = useSelector(selectUsername);

	const [ messages, setMessages ] = useState([]); 

	useEffect(() => {
		if (chatSocket) {
			joinChatRoom();
			
			chatSocket.on("load_room_history", (data) => { 
				const pastMessages = data.map((msgInfo) => convertToMessageBoxFields(msgInfo, currUsername));
				setMessages(messages => messages.concat(pastMessages));
			});

			chatSocket.on("receive_message", (data) => {
				setMessages(state => [
					...state, 
					convertToMessageBoxFields(data, currUsername)
				]);
			});

			return () => {
				chatSocket.off("receive_message");
			};
		}
	}, [ chatSocket ]);

	const emitMessage = (msg) => { 
		if (msg && msg.length > 0) {
			chatSocket.emit("send_message", { msg, username: currUsername, roomId });
		}
	};

	const joinChatRoom = () => {
		chatSocket.emit("join_chatroom", { username: currUsername, roomId }); 
	};

	return <Box container sx={{ height: "calc(30% - 6px)", paddingTop: "5px", backgroundColor: "white", borderTop: "1px solid black" }}>
		<Grid container height={"calc(100% - 55px)"}>
			<Grid item sx={{ height: "100%", width: "100%", overflowY: "auto", display: "flex", flexDirection: "column-reverse" }}>
				<ChatBox messages={messages} /> 
			</Grid>
			<Grid item sx={{ height: "50px", width: "100%" }}>
				<MessageInput onSend={msg => emitMessage(msg)} />
			</Grid>
		</Grid>
	</Box>;
};

export default Messager; 
