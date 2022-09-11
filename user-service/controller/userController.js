import { handleUserLogin, isUserExists, handleCreateUser } from "../domain/userDomain.js";

export const handleSignUp = async (req, res) => {
	const { username, password } = req.body;
	if (!username) {
		console.debug("Username empty");
		return res.status(400).json({ message: "Username cannot be empty" });
	}
	if (!password) {
		console.debug("Password empty");
		return res.status(400).json({ message: "Password cannot be empty" });
	}

	if (await isUserExists(username)) {
		console.debug("Username already exists");
		return res.status(409).json({ message: "User already exists!" });
	}

	handleCreateUser(username, password).then((success) => {
		if (!success) {
			console.debug("Failed to create user: " + username);
			return res.status(401).json({ message: "Password does not meet requirements" });
		}
		console.log(`Created new user ${username} successfully!`);
		return res.status(201).json({ message: `Created new user ${username} successfully!` });
	}).catch(err => {
		console.debug("Error: ", err);
		return res.status(500).json({ message: err });
	});
};

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
