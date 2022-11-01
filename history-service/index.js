import cors from "cors";
import express from "express";
import { handleAddHistory, handleGetHistory, handleUpdateHistory } from "./controller/historyController.js";

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

router.post("/getHistory", handleGetHistory);
router.post("/addHistory", handleAddHistory);
router.post("/updateHistory", handleUpdateHistory);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8003;

app.listen(PORT, () => console.log("question-service is listening on port ", PORT));
