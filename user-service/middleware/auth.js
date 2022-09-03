import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
	const token = req.body.token || req.query.token || req.headers["x-access-token"]; 

	if (!token) {
		return res.status(403).body({ message: "A token is required for authentication" });
	}

	try {
		// eslint-disable-next-line no-undef
		const decoded = jwt.verify(token, process.env.TOKEN_KEY); 
		req.user = decoded; 
	} catch (err) {
		return res.status(401).body({ message: "Invalid token" });
	}

	return next; 
};