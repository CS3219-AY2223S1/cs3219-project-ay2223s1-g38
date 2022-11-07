import mongoose from "mongoose"; 
const { Schema } = mongoose; 

export const messageSchema = new Schema({ 
	message: String, 
	username: String, 
	date: Date
});

export const roomSchema = new Schema({ 
	roomId: String, 
	messages: [ messageSchema ]
});
