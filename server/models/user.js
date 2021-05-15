import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  email: String,
  phoneNum: String,
  deviceSetId: String,
  role: String, // User || Admin
});

var UserModel = mongoose.model('UserModel', userSchema);

export default UserModel;
