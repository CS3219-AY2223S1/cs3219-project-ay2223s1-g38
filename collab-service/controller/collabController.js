import { addRoomSchema } from "../dto/addRoomDto.js";
import { deleteRoomSchema } from "../dto/deleteRoomDto.js";
import { findRoomSchema } from "../dto/findRoomByUidDto.js";
import { updateQuestionIdSchema } from "../dto/updateQuestionIdDto.js";
import { deleteRoomService, findRoomByUidService } from "../service/collabService.js";
import { addRoomService } from "../service/collabService.js";
import { updateQuestionIdService } from "../service/collabService.js";

export const handleAddRoom = (req, res) => {
	try {
		const { error, value } = addRoomSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.message });
		}
		const { userId1, userId2, roomId, questionId } = value;

		addRoomService(userId1, userId2, roomId, questionId).then((room) => {
			if (!room) {
				return res.status(400).json({ message: "Failed to add room. Room ID already exists" });
			}
			console.debug("Added room successfully");
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
				console.debug("No room found");
				return res.status(200).json({ message: "No room found" });
			}
			console.debug("Found room");
			return res.status(200).json({
				message: "Found room",
				room: room,
			});
		});
	} catch (err) {
		console.error("Error: ", err);
		return res.status(500).json({ message: "An error occured, please try again later." });
	}
};

export const handleUpdateQuestionId =  (req, res) => {
	try {
		const { error, value } = updateQuestionIdSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.message });
		}
		const { roomId, newQuestionId } = value;

		updateQuestionIdService(roomId, newQuestionId).then((room) => {
			if (!room) {
				console.debug("Room does not exist");
				return res.status(400).json({ message: "Room does not exist" });
			}
			console.debug("Updated question id successfully");
			return res.status(200).json({
				message: "Updated question id successfully",
				room: room,
			});
		});
	} catch (err) {
		console.error("Error: ", err);
		return res.status(500).json({ message: "An error occured, please try again later." });
	}
};

export const handleDeleteRoom =  (req, res) => {
	try {
		const { error, value } = deleteRoomSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.message });
		}
		const { roomId } = value;

		deleteRoomService(roomId).then((room) => {
			if (!room) {
				console.debug("Room does not exist");
				return res.status(400).json({ message: "Room does not exist" });
			}
			console.debug("Deleted room successfully");
			return res.status(200).json({
				message: "Deleted room successfully",
			});
		});
	} catch (err) {
		console.error("Error: ", err);
		return res.status(500).json({ message: "An error occured, please try again later." });
	}
};