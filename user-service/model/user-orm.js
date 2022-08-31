import { createUser, isUserExists } from './repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password) {
    try {
        if (await isUserExists(username)) {
            return { err : 409, msg : "User already exists!" };
        }
        const newUser = await createUser({username, password});
        newUser.save();
        return true;
    } catch (err) {
        console.log('ERROR: Could not create new user');
        return { err : 400, msg : "Could not create a new user!" };
    }
}
