import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  email: { type: String, unique: true },
  phoneNum: { type: String, unique: true },
  deviceSetName: String,
  role: String, // User || Admin
});

var UserModel = mongoose.model('UserModel', userSchema);

export default UserModel;
