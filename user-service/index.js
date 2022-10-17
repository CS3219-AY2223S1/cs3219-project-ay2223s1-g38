import cors from "cors";
import express from "express";

// import { verifyToken } from "./middleware/auth.js";
import { handleLogin, handleSignUp, handleUniqueUsername, } from "./controller/userController.js";
import { verifyToken } from "./middleware/auth.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

const router = express.Router();

app.use("/api/user", router).all((_, res) => {
	res.setHeader("content-type", "application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");
});

router.post("/createUser", handleSignUp);
router.post("/login", verifyToken, handleLogin);
router.post("/uniqueUsername", handleUniqueUsername);

app.listen(8000, () => console.log("user-service is listening on port 8000"));
