import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"; 

import { getUserByUsername } from "../repository/userRepository.js";

export const handleUserLogin = async (username, password) => {
	const user = await getUserByUsername(username); 
	if (user) {
		const isPasswordValid = await bcryptjs.compare(password, user.password); 

		if (isPasswordValid) {
			const token = await generateJwtToken(username); 
			return token; 
		} else {
			return null; 
		}
	}
	console.log("No user found for username");
	return null; 
}; 

const generateJwtToken = (username) => {
	const token = jwt.sign({
		username
	// eslint-disable-next-line no-undef
	}, process.env.TOKEN_KEY,
	{
		expiresIn: "2h"
	}); 

	return token; 
};