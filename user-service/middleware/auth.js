import firebaseAdmin from "../config/firebase.js";

export const verifyToken = async (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		return res.status(403).json({ message: "A token is required for authentication" });
	}

	try {
		const decoded = await firebaseAdmin.auth.verifyIdToken(token);
		req.user = decoded; 
		console.log(decoded);
		next();
	} catch (err) {
		console.error("Token verification error: ", err);
		return res.status(401).json({ message: "Invalid token" });
	}

	return next; 
};