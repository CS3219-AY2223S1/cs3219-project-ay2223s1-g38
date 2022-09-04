import bcryptjs from "bcryptjs";

import { addUser  } from "../repository/userRepository.js";
import { handleUserLogin } from "../domain/userDomain.js";

// TODO: IMPORTANT: need to decouple this and refactor
export async function handleCreateUser(req, res) {
	try {
		const { username, password } = req.body;
		if (username && password) {
			const encryptedPassword = await bcryptjs.hash(password, 10);

			const resp = await addUser(username, encryptedPassword);
			if (resp.err == 400) {
				return res.status(resp.err).json({ message: "Could not create a new user!" });
			} else if (resp.err) {
				return res.status(resp.err).json({ message: resp.msg });
			} else {
				console.log(`Created new user ${username} successfully!`);
				return res.status(201).json({ message: `Created new user ${username} successfully!` });
			}
		} else {
			return res.status(400).json({ message: "Username and/or Password are missing!" });
		}
	} catch (err) {
		return res.status(500).json({ message: "Database failure when creating new user!" });
	}
}

export const handleLogin = (req, res) => {
	const { username, password } = req.body; 
	if (!username) {
		console.debug("Invalid username");
		return res.status(400).json({ message: "Username cannot be empty" });
	} 
	if (!password) {
		console.debug("Invalid password");
		return res.status(400).json({ message: "Password cannot be empty" });
	}

	handleUserLogin(username, password).then((token) => {
		if (!token) {
			console.debug("Invalid credentials for: " + username);
			return res.status(401).json({ message: "Credentials are invalid" });
		}
	
		console.debug("Successfully logged in for: " + username);
		return res.status(200).json({
			message: `Logged in to ${username} successfully`,
			username, 
			token
		});
	}).catch(err => {
		console.debug("Error: ", err); 
		return res.status(500).json({ message: err });
	}); 
};
