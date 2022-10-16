import { findUserByUidOrm, createUserOrm, findUserByUsernameOrm } from "../model/userOrm.js";

export const createUser = async (uid, username) => {
	const user = await findUserByUsernameOrm(username);
	if (user) {
		throw new Error("User with the same username already exists");
	}
	const newUser = await createUserOrm(uid, username);
	if (!newUser) {
		throw new Error("Failed to create user");
	}
	return newUser;
};

export const getUser = async (uid) => {
	const user = await findUserByUidOrm(uid);
	if (!user) {
		throw new Error("Failed to find user");
	}
	return user;
};
