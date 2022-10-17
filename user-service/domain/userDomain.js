import { createUser, getUser } from "../repository/userRepository.js";

export const handleUserCreate = async (uid, username) => {
	const user = await createUser(uid, username);
	return user;
};

export const handleUserLogin = async (uid) => {
	const user = await getUser(uid); 
	return user;
}; 