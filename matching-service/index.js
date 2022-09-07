import { createServer } from "http";

import cors from "cors";
import express from "express";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

app.get("/", (req, res) => {
	res.send("Hello World from matching-service");
});
const httpServer = createServer(app);

httpServer.listen(8001);
