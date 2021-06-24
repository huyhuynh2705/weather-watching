import bcrypt from "bcryptjs";
import e from "express";
import jwt from "jsonwebtoken";
import DeviceSetModel from "../models/deviceSet.js";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import UserModel from "../models/user.js";

dotenv.config();
const secret = 'hqh';

export const signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const oldUser = await UserModel.findOne({ username });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ username: oldUser.username, id: oldUser._id }, secret, { expiresIn: "0.5h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signUp = async (req, res) => {
  let { username, password, name, email, phoneNum, address } = req.body;
  try {
    const oldUser = await UserModel.findOne({ username });
    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const oldEmail = await UserModel.findOne({ email });
    if (oldEmail) return res.status(400).json({ message: "Email already exists" });

    const oldPhoneNum = await UserModel.findOne({ phoneNum });
    if (oldPhoneNum) return res.status(400).json({ message: "Phone number already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await UserModel.create({ username, password: hashedPassword, name: name, email: email, phoneNum: phoneNum, address: address, deviceSetName: '', role: '' });
    
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
}

export const addUser = async (req, res) => {
  let { username, password, name, email, phoneNum, address, deviceSetName, role } = req.body;
  try {
    const oldUser = await UserModel.findOne({ username });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const oldEmail = await UserModel.findOne({ email });

    if (oldEmail) return res.status(400).json({ message: "Email already exists" });

    const oldPhoneNum = await UserModel.findOne({ phoneNum });

    if (oldPhoneNum) return res.status(400).json({ message: "Phone number already exists" });

    if (deviceSetName == 'None') {
      deviceSetName = ''
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await UserModel.create({ username, password: hashedPassword, name: name, email: email, phoneNum: phoneNum, address: address, deviceSetName: deviceSetName, role: role });

    if (deviceSetName != '') {
      const deviceSet = await DeviceSetModel.findOne( {setName: deviceSetName} )
      if (!deviceSet) return res.status(404).json({ message: "Device set doesn't exist."}) 
      if (deviceSet.userID != "") return res.status(404).json({ message: "Device set already has user."}) 
      await DeviceSetModel.findByIdAndUpdate( deviceSet._id, { userID: result._id } , { new: true } )
    }

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { name, email, phoneNum, address, deviceSetName, password } = req.body;

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
  
  let updateProfile = { name, email, phoneNum, address, deviceSetName };

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 12);
    updateProfile = { name, email, phoneNum, address, deviceSetName, password: hashedPassword };
  }

  const token = jwt.sign({ username: oldUser.username, id: oldUser._id }, secret, { expiresIn: "0.5h" });
  
  const updatedProfile = await UserModel.findByIdAndUpdate(id, updateProfile, { new: true });

  res.json({ result: updatedProfile, token });
}

export const deleteUser = async (req, res) => {
    
  // req.params= {id: ''}
  const { id } = req.params;

  try {
      const oldUser = await UserModel.findById(id);
      if (!oldUser) {
          return res.status(404).json({ message: "User doesn't exist." });
      }

      const deviceSet = await DeviceSetModel.findOne( {setName: oldUser.deviceSetName} )
      if (deviceSet) {
        await DeviceSetModel.findByIdAndUpdate( deviceSet._id, { userID: '' } , { new: true } )
      }

      await UserModel.findByIdAndRemove(id);

      return res.status(200).json(oldUser);            
      
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

  let { id, password, name, email, phoneNum, address, deviceSetName, role } = req.body;

  const oldUser = await UserModel.findById(id)
  if (!oldUser) return res.status(404).json({ message: "User doesn't exist." });
  
  if ((password == '' &&  deviceSetName == '' && role == '' && name=='' && email=='' && phoneNum=='' && address=='') || 
        (password==oldUser.password && deviceSetName==oldUser.deviceSetName && role==oldUser.role && username==oldUser.username
          && name==oldUser.name && email==oldUser.email && phoneNum==oldUser.phoneNum && address==oldUser.address)) {
        return res.status(200).json({ message: "User is up to date."});
  }

  if (name != oldUser.name) {
    if (name == '') {
      name = oldUser.name;
    }
  }

  if (address != oldUser.address) {
    if (address == '') {
      address = oldUser.address;
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
      await DeviceSetModel.findOneAndUpdate( {setName: deviceSetName}, { userID: '' } , { new: true } )
      deviceSetName = ''
    }
    else {
      const deviceSet = await DeviceSetModel.findOne( {setName: deviceSetName} )
      if (!deviceSet) return res.status(404).json({ message: "Device set doesn't exist."}) 
      if (deviceSet.userID != "") return res.status(404).json({ message: "Device set already has user."}) 
      await DeviceSetModel.findByIdAndUpdate( deviceSet._id, { userID: id } , { new: true } )
      if (oldUser.deviceSetName != '') {
        const oldDeviceSet = await DeviceSetModel.findOne( {setName: oldUser.deviceSetName} )
        if (oldDeviceSet.userID == id) {
          await DeviceSetModel.findByIdAndUpdate( oldDeviceSet._id, { userID: '' } , { new: true } )
        }
      }
    }
  }

  if (role != oldUser.role) {
    if (role == '') {
      role = oldUser.role;
    }
  }

  let updateUser = { deviceSetName, name, email, phoneNum, address, deviceSetName, role };

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 12);
    updateUser = { password: hashedPassword, name, email, phoneNum, address, deviceSetName, role };
  }

  const updatedUser = await UserModel.findByIdAndUpdate(id, updateUser, { new: true });
  res.json(updatedUser);
 
}

//return all usernames that have no deviceSet
export const getUserName = async (req, res) => {
  try {
      const array = await UserModel.find({ deviceSetName: "", role: "User" }, { username: 1 } );
      let username = []
      for (let i = 0; i < array.length; i++) {
          username.push(array[i].username);
      }
      res.status(200).json(username);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const forgotPassword = async (req, res) => {
  const {email} = req.body
  try {
    const oldUser = await UserModel.findOne({email: email})
    if (!oldUser) return res.status(404).json({ message: "User doesn't exist." });
    const newPassword = oldUser.password.slice(10, 20)

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });
    
    let mailOptions = {
      from: '"Weather Watching"',
      to: email,
      subject: 'Weather Watching - Forgot Password',
      text: `Hello ${oldUser.name}, this is your new password: ${newPassword}. Use this password to log in to account ${oldUser.username}.`,
    };
    
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
          return console.log('Error occurs', err);
      }
  });

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  const updatedProfile = await UserModel.findByIdAndUpdate(oldUser._id, {password: hashedPassword}, { new: true });
  
  res.status(200).json(updatedProfile)
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}


export const confirmUser = async (req, res) => {
  const { id }= req.params
  try {
    const oldUser = await UserModel.findById(id)
    if (!oldUser) return res.status(404).json({ message: "User doesn't exist." });
    const email = oldUser.email
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });
    
    let mailOptions = {
      from: '"Weather Watching"',
      to: email,
      subject: 'Weather Watching - Confirm',
      text: `Hello ${oldUser.name}.
Your account has been confirmed. Now you can login with account ${oldUser.username}.` ,
    };
    
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        return console.log('Error occurs', err);
      }
    });
    res.status(200).json("Success")
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}