import mongoose from "mongoose";
var Schema = mongoose.Schema;
let UserModelSchema = new Schema({
	_id: {
		type: String,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
}, { _id: false, id: false });

export default mongoose.model("UserModel", UserModelSchema);
