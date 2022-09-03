import { ormCreateUser as _createUser } from "../model/user-orm.js";
import { ormLogin as _login } from "../model/user-orm.js";

export async function createUser(req, res) {
	try {
		const { username, password } = req.body;
		if (username && password) {
			const resp = await _createUser(username, password);
			console.log(resp);
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

export async function login(req, res) {
	try {
		const { username, password } = req.body;
		if (username && password) {
			const resp = await _login(username, password);
			console.log(resp);
			if (resp.err == 400) {
				return res.status(resp.err).json({ message: "Could not log in!" });
			} else if (resp.err) {
				return res.status(resp.err).json({ message: resp.msg });
			} else {
				console.log(`Logged in to '${username}' successfully!`);
				return res.status(200).json({ message: `Logged in to '${username}' successfully!`, username : resp.username });
			}
		} else {
			return res.status(400).json({ message: "Username and/or Password are missing!" });
		}
	} catch (err) {
		return res.status(500).json({ message: "Database failure when logging in!" });
	}
}
