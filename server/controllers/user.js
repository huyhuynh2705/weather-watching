import bcrypt from "bcryptjs";
import e from "express";
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

    const oldEmail = await UserModel.findOne({ email });

    if (oldEmail) return res.status(400).json({ message: "Email already exists" });

    const oldPhoneNum = await UserModel.findOne({ phoneNum });

    if (oldPhoneNum) return res.status(400).json({ message: "Phone number already exists" });

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

  if (email != oldUser.email) {
    const oldEmail = await UserModel.findOne({ email });
    if (oldEmail && oldEmail != oldUser.email) return res.status(400).json({ message: "Email already exists" });
  }

  if (phoneNum != oldUser.phoneNum) {
    const oldPhoneNum = await UserModel.findOne({ phoneNum });
    if (oldPhoneNum) return res.status(400).json({ message: "Phone number already exists" });
  }
  
  let updateProfile = { name, email, phoneNum, deviceSetId };

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 12);
    updateProfile = { name, email, phoneNum, deviceSetId, password: hashedPassword };
  }

  const token = jwt.sign({ username: oldUser.username, id: oldUser._id }, secret, { expiresIn: "1h" });
  
  const updatedProfile = await UserModel.findByIdAndUpdate(id, updateProfile, { new: true });

  res.json({ result: updatedProfile, token });
}

export const deleteUser = async (req, res) => {
    
  // req.params= {id: ''}
  const { id } = req.params;

  try {
      const oldDevice = await UserModel.findById(id);
      if (!oldDevice) {
          return res.status(404).json({ message: "User doesn't exist." });
      }
      else {
          await UserModel.findByIdAndRemove(id);

          return res.status(200).json({ message: "User is deleted."});            
      }
      
  } catch (error) {
      res.status(404).json({ message: error.message });
  }

}
export const getAdminUser = async (req, res) => {
    
  const { page, limit } = req.body;
  const skipIndex = (page - 1) * limit;
  let UserMessage = [];

  try {
      UserMessage = await UserModel.find()
      .sort({ _id: 1 })
      .skip(skipIndex)
      .limit(limit)

      res.status(200).json(UserMessage);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}