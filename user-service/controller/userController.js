import { handleUserCreate, handleUserLogin, handleCheckUsername } from "../domain/userDomain.js";

export async function handleSignUp(req, res) {
	const { uid, username } = req.body;
	if (!uid || !username) {
		console.debug("Missing fields");
		return res.status(400).json({ message: "Missing fields" });
	}

	try {
		const user = await handleUserCreate(uid, username);
		return res.status(201).json({ message: "Created new user with username: " + username, user });
	} catch (err) {
		console.debug(err.message);
		return res.status(409).json({ message: err.message });
	}
}

export async function handleUniqueUsername(req, res) {
	const { username } = req.body;
	if (!username) {
		return res.status(400).json({ message: "Missing username field" });
	}
	try {
		const hasUser = await handleCheckUsername(username);
		return res.status(200).send(hasUser);
	} catch (err) {
		console.debug(err.message);
		return res.status(400).json({ message: err.message });
	}
}

export async function handleLogin(req, res) {
	const { uid } = req.user;
	try {
		const user = await handleUserLogin(uid);
		return res.status(200).json({
			message: "Logged in and fetched user data",
			user
		});
	} catch (err) {
		console.debug(err.message);
		return res.status(500).json({ message: err.message });
	}
}
