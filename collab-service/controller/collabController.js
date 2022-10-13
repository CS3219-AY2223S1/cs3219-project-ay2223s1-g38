import { addRoomService } from "../service/collabService.js";
import { addRoomSchema } from "../dto/addRoomDto.js";
import { findRoomByUidService } from "../service/collabService.js";
import { findRoomSchema } from "../dto/findRoomByUidDto.js";

export const handleAddRoom = (req, res) => {
	try {
		const { error, value } = addRoomSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.message });
		}
		const { userId1, userId2, roomId, questionId } = value;

		addRoomService(userId1, userId2, roomId, questionId).then((room) => {
			if (!room) {
				return res.status(400).json({ message: "Failed to add room" });
			}
			return res.status(201).json({
				message: "Added room successfully",
				room: room,
			});
		});
	} catch (err) {
		console.error("Error: ", err);
		return res.status(500).json({ message: "An error occured, please try again later." });
	}
};

export const handleFindRoomByUid = (req, res) => {
	try {
		const { error, value } = findRoomSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.message });
		}
		const { userId } = value;

		findRoomByUidService(userId).then((room) => {
			if (!room) {
				return res.status(200).json({ message: "No room found" });
			}
			return res.status(200).json({
				message: "Found room",
				room: room,
			});
		});
	} catch (err) {
		console.error("Error: ", err);
		return res.status(500).json({ message: "An error occured, please try again later." });
	}
}