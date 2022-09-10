import express from "express";
import cors from "cors";

// import { verifyToken } from "./middleware/auth.js";
import { handleCreateUser, handleLogin, } from "./controller/userController.js";

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

router.post("/createUser", handleCreateUser);
router.post("/login", handleLogin);

// usage of JWT token 
// router.post(route, verifyToken, controller method)

app.listen(8000, () => console.log("user-service is listening on port 8000"));