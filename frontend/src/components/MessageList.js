import React from "react";

import { MessageList } from "react-chat-elements";

const ChatBox = (props) => {
	// eslint-disable-next-line react/prop-types
	const { messages } = props; 

	// eslint-disable-next-line react/prop-types

	return <MessageList 
		className="message-list"
		toBottomHeight={"100%"}
		dataSource={messages} />;
};

export default ChatBox; 