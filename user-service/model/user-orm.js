import { createUser, isUserExists, login } from "./repository.js";

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password) {
	try {
		if (await isUserExists(username)) {
			return { err : 409, msg : "User already exists!" };
		}
		const newUser = await createUser({ username, password });
		newUser.save();
		return true;
	} catch (err) {
		console.log("ERROR: Could not create new user");
		return { err : 400, msg : err };
	}
}

export async function ormLogin(username, password) {
	try {
		let user = await login({ username, password });
		if (user) {
			return { username : user.username };
		}
		console.log("Invalid login credentials!");
		return { err : 401, msg : "Invalid login credentials!" };
	} catch (err) {
		console.log("ERROR: Could not log in!");
		return { err : 400, msg : err };
	}
}
