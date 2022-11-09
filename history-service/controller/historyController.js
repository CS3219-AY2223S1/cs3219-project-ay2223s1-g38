import { addHistorySchema } from "../dto/addHistoryDto.js";
import { getHistorySchema } from "../dto/getHistoryDto.js";
import { updateHistoryByRoomIdSchema } from "../dto/updateHistoryByRoomIdDto.js";
import { updateHistorySchema } from "../dto/updateHistoryDto.js";
import { addHistoryService, getHistoryService, updateHistoryByRoomIdService, updateHistoryService } from "../service/historyService.js";

export const handleGetHistory = (req, res) => {
	try {
		const { error, value } = getHistorySchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.message });
		}

		const { uid } = value;

		getHistoryService(uid).then((history) => {
			if (!history) {
				return res.status(400).json({ message: "Failed to retrieve history" });
			}
			return res.status(200).json({
				message: "Retrieved history successfully",
				history: history,
			});
		});
	} catch (err) {
		console.error("Error: ", err);
		return res.status(500).json({ message: "An error occured, please try again later." });
	}
};

export const handleAddHistory = (req, res) => {
	try {
		const { error, value } = addHistorySchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.message });
		}

		const { uid1, uid2, roomId, qid, difficulty } = value;

		addHistoryService(uid1, uid2, roomId, qid, difficulty).then((history) => {
			if (!history) {
				return res.status(400).json({ message: "Failed to record history" });
			}
			return res.status(200).json({
				message: "Recorded new history",
				history: history,
			});
		});
	} catch (err) {
		console.error("Error: ", err);
		return res.status(500).json({ message: "An error occured, please try again later." });
	}
};

export const handleUpdateHistory = (req, res) => {
	try {
		const { error, value } = updateHistorySchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.message });
		}

		const { uid1, uid2, qid } = value;

		updateHistoryService(uid1, uid2, qid).then((history) => {
			if (!history) {
				return res.status(400).json({ message: "Failed to update history" });
			}
			return res.status(200).json({
				message: "Updated new history",
				history: history,
			});
		});
	} catch (err) {
		console.error("Error: ", err);
		return res.status(500).json({ message: "An error occured, please try again later." });
	}
};

export const handleUpdateHistoryByRoomId = (req, res) => {
	try {
		const { error, value } = updateHistoryByRoomIdSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.message });
		}

		const { roomId, qid } = value;

		updateHistoryByRoomIdService(roomId, qid).then((history) => {
			if (!history) {
				return res.status(400).json({ message: "Failed to update history" });
			}
			return res.status(200).json({
				message: "Updated new history",
				history: history,
			});
		});
	} catch (err) {
		console.error("Error: ", err);
		return res.status(500).json({ message: "An error occured, please try again later." });
	}
};