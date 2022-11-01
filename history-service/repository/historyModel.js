import mongoose from "mongoose";
var Schema = mongoose.Schema;
let HistoryModelSchema = new Schema({
	uid1: {
		type: String,
		required: true,
	},
	uid2: {
		type: String,
		required: true,
	},
	qids: {
		type: Array,
		required: true,
	},
	difficulty: {
		type: String,
		required: true,
	},
}, {timestamps: true});

export default mongoose.model("HistoryModel", HistoryModelSchema);
