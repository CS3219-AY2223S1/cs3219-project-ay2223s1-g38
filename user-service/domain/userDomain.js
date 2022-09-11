import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { addUser, getUserByUsername } from "../repository/userRepository.js";

export const isUserExists = async (username) => {
	let user = await getUserByUsername(username);
	return user != null;
};

export const handleCreateUser = async (username, password) => {
	function isPasswordValid(string) {
		const
			upper = /[A-Z]/.test(string),
			lower = /[a-z]/.test(string),
			specialCharacter = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(string);
		return upper && lower && specialCharacter && password.length >= 8;
	}

	if (!isPasswordValid(password)) {
		return false;
	}

	console.log("Password meets requirements");
	const encryptedPassword = await bcryptjs.hash(password, 10);
	addUser(username, encryptedPassword);
	return true;
};

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
	console.debug("No user found for username: " + username);
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