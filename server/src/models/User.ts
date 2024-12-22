import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	userType: {
		type: String,
		required: true,
		enum: ["admin", "user"],
		default: "user",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;