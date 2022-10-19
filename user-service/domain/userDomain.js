import { createUser, getUser, checkUsername } from "../repository/userRepository.js";

export const handleUserCreate = async (uid, username) => {
	const user = await createUser(uid, username);
	return user;
};

export const handleCheckUsername = async (username) => {
	const hasUser = await checkUsername(username);
	return hasUser;
};

export const handleUserLogin = async (uid) => {
	const user = await getUser(uid); 
	return user;
}; 
