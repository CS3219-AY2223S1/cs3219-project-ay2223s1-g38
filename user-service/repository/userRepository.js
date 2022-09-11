import { findUserByUsername, createUser } from "../model/userOrm.js";

// TODO: IMPORTANT: need to separate orm functions from repository to decouple business logic from persistence
// Repo layer should not contain error codes for client
export const addUser = async (username, password) => {
	try {
		console.log(username, password);
		const newUser = createUser({ username, password });
		newUser.save();
	} catch (err) {
		console.error("ERROR: Could not create new user", err);
		throw err;
	}
};

export const getUserByUsername = async (username) => {
	try {
		let user = await findUserByUsername(username);
		return user;
	} catch (err) {
		console.error("ERROR: Failed to retrieve user", err);
		throw err;
	}
};
