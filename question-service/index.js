import cors from "cors";
import express from "express";

import { handleGetQuestion, handleGetQuestionById, handleGetQuestionWithBlackList } from "./controller/questionController.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

const router = express.Router();

app.use("/api/question", router).all((_, res) => {
	res.setHeader("content-type", "application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");
});

router.get("/getQuestion", handleGetQuestion);
router.post("/getQuestionById", handleGetQuestionById);
router.post("/getQuestionWithBlackList", handleGetQuestionWithBlackList);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("question-service is listening on port ", PORT));
