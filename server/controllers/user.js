import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.js";

const secret = 'test';

export const signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ username });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ username: oldUser.username, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { username, password, name, email, phoneNum, deviceSetId, role } = req.body;

  try {
    const oldUser = await UserModel.findOne({ username });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({ username, password: hashedPassword, name: name, email: email, phoneNum: phoneNum, deviceSetId: deviceSetId, role: role });

    const token = jwt.sign( { username: result.username, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { name, email, phoneNum, deviceSetId, password } = req.body;

  const oldUser = await UserModel.findById(id)
  
  if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
  
  let updateProfile = { name, email, phoneNum, deviceSetId };

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 12);
    updateProfile = { name, email, phoneNum, deviceSetId, password: hashedPassword };
  }

  const token = jwt.sign({ username: oldUser.username, id: oldUser._id }, secret, { expiresIn: "1h" });
  
  const updatedProfile = await UserModel.findByIdAndUpdate(id, updateProfile, { new: true });

  res.json({ result: updatedProfile, token });
}