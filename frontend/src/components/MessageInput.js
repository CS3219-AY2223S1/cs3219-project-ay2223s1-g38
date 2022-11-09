import React, { useState } from "react";

import { Input, Button, Box } from "@mui/material";

// eslint-disable-next-line react/prop-types
const MessageInput = ({ onSend }) => {
	const [ msg, setMsg ] = useState("");

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			onSend(msg);
			setMsg("");
		}
	};

	return (
		<Box sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}>
			<Input
				onKeyDown={handleKeyPress}
				sx={{ padding: "10px" }}
				fullWidth
				disableUnderline
				value={msg}
				onChange={(val) => setMsg(val.target.value)}
				placeholder="Enter message here..."
				multiline={false}
			/>
			<Button
				onClick={() => {
					onSend(msg);
					setMsg("");
				}}
			>
        Send
			</Button>
		</Box>
	);
};

export default MessageInput;
