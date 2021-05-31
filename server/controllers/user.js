import bcrypt from "bcryptjs";
import e from "express";
import jwt from "jsonwebtoken";
import DeviceSetModel from "../models/deviceSet.js";

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

export const addUser = async (req, res) => {
  const { username, password, name, email, phoneNum, deviceSetName, role } = req.body;
  try {
    const oldUser = await UserModel.findOne({ username });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const oldEmail = await UserModel.findOne({ email });

    if (oldEmail) return res.status(400).json({ message: "Email already exists" });

    const oldPhoneNum = await UserModel.findOne({ phoneNum });

    if (oldPhoneNum) return res.status(400).json({ message: "Phone number already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({ username, password: hashedPassword, name: name, email: email, phoneNum: phoneNum, deviceSetName: deviceSetName, role: role });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { name, email, phoneNum, deviceSetName, password } = req.body;

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
  
  let updateProfile = { name, email, phoneNum, deviceSetName };

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 12);
    updateProfile = { name, email, phoneNum, deviceSetName, password: hashedPassword };
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

//dem so admin(s)
export const getCountAdmin = async (req, res) => {
  try {
      const numberOfAdmin = await UserModel.countDocuments({role:{$eq:"Admin"}});

      res.status(200).json(numberOfAdmin);
      
  } catch (error) {
      res.status(404).json({ message: error.message });
  }

}

//dem so users
export const getCountUser = async (req, res) => {
  try {
      const numberOfUser = await UserModel.countDocuments({role:{$eq:"User"}});

      res.status(200).json(numberOfUser);
      
  } catch (error) {
      res.status(404).json({ message: error.message });
  }

}

//dem tổng số users (gồm admin và users)
export const getCountAllUser = async (req, res) => {
  try {
      const numberOfUser = await UserModel.estimatedDocumentCount();

      res.status(200).json(numberOfUser);
      
  } catch (error) {
      res.status(404).json({ message: error.message });
  }

}

//dem tổng số users có deviceSet 
//? admin có thể so huu deviceSet ko?
export const getCountSubscriber = async (req, res) => {
  try {
    const numberOfSubscriber = await UserModel.countDocuments( { deviceSetName: { $ne:"" } } );

      res.status(200).json(numberOfSubscriber);
      
  } catch (error) {
      res.status(404).json({ message: error.message });
  }

}

export const updateUser = async (req, res) => {

  let { id, username, password, name, email, phoneNum, deviceSetName, role } = req.body;

  const oldUser = await UserModel.findById(id)
  if (!oldUser) return res.status(404).json({ message: "User doesn't exist." });
  
  if ((password == '' &&  deviceSetName == '' && role == '' && username == '' && name=='' && email=='' && phoneNum=='') || 
        (password==oldUser.password && deviceSetName==oldUser.deviceSetName && role==oldUser.role && username==oldUser.username
          && username==oldUser.username && name==oldUser.name && email==oldUser.email && phoneNum==oldUser.phoneNum)) {
        return res.status(200).json({ message: "User is up to date."});
  }

  if (username != oldUser.username) {
      if (username == '') {
          username = oldUser.username;
      }
      else {
        const oldUsername = await UserModel.findOne({ username });
        if (oldUsername) return res.status(400).json({ message: "Username already exists" });
      }
  }

  if (name != oldUser.name) {
    if (name == '') {
      name = oldUser.name;
    }
  }
  
  if (email != oldUser.email) {
    if (email == '') {
      email = oldUser.email;
    }
    else {
      const oldEmail = await UserModel.findOne({ email });
      if (oldEmail && oldEmail != oldUser.email) return res.status(400).json({ message: "Email already exists" });
    }
  }

  if (phoneNum != oldUser.phoneNum) {
    if (phoneNum == '') {
      phoneNum = oldUser.phoneNum;
    }
    else {
      const oldPhoneNum = await UserModel.findOne({ phoneNum });
      if (oldPhoneNum) return res.status(400).json({ message: "Phone number already exists" });
    }
  }

  if (deviceSetName != oldUser.deviceSetName) {
    if (deviceSetName == '') {
      deviceSetName = oldUser.deviceSetName;
    }
    else if (deviceSetName == 'None') { 
      deviceSetName = oldUser.deviceSetName 
      const deviceSet = await DeviceSetModel.findOne( {setName: deviceSetName} )
      if (!deviceSet) return res.status(404).json({ message: "Device set doesn't exist."}) 
      await DeviceSetModel.findByIdAndUpdate( deviceSet._id, { userID: '' } , { new: true } )
      deviceSetName = ''
    }
    else {
      const deviceSet = await DeviceSetModel.findOne( {setName: deviceSetName} )
      if (!deviceSet) return res.status(404).json({ message: "Device set doesn't exist."}) 
      if (deviceSet.userID != "") return res.status(404).json({ message: "Device set already has user."}) 
      await DeviceSetModel.findByIdAndUpdate( deviceSet._id, { userID: id } , { new: true } )

    }
  }

  if (role != oldUser.role) {
    if (role == '') {
      role = oldUser.role;
    }
  }

  let updateUser = { username, deviceSetName, name, email, phoneNum, deviceSetName, role };

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 12);
    updateUser = { username, password: hashedPassword, name, email, phoneNum, deviceSetName, role };
  }

  const updatedUser = await UserModel.findByIdAndUpdate(id, updateUser, { new: true });
  res.json(updatedUser);
 
}