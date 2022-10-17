import mongoose from "mongoose";
var Schema = mongoose.Schema;
let RoomModelSchema = new Schema({
	userId1: {
		type: String,
		required: true,
	},
	userId2: {
		type: String,
		required: true,
	},
	roomId: {
		type: String,
		required: true,
		unique: true,
	},
	questionId: {
		type: Number,
		required: true,
	},
}, {
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model("RoomModel", RoomModelSchema);