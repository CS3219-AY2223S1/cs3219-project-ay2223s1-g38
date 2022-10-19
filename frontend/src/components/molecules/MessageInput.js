import React, { useState } from "react";

import { Input, Button, Grid } from "@mui/material";
 
// eslint-disable-next-line react/prop-types
const MessageInput = ({ onSend }) => {
	const [ msg, setMsg ] = useState(""); 

	return <>
		<Grid container direction="row" alignItems="center" justifyContent="center">
			<Grid item>
				<Input
					value={msg}
					onChange={(val) => setMsg(val.target.value)}
					placeholder="Enter message here..."
					multiline={true}
				/>
			</Grid>
			<Grid item>
				<Button onClick={() => 
				{ 
					onSend(msg);
					setMsg("");
				}}>Send</Button>
			</Grid>
		</Grid>
	</>;
};

export default MessageInput;