import express from 'express';
import mongoose from 'mongoose';

import DeviceSetModel from '../models/deviceSet.js';
import DeviceModel from '../models/device.js';
import UserModel from "../models/user.js";

const router = express.Router();

export const getDeviceSet = async (req, res) => { 
    
    try {
        const deviceSetMessage = await DeviceSetModel.find();

        res.status(200).json(deviceSetMessage);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// export const updateDeviceSet = async (req, res) => {
    //body: {id: '', setName: '', username: '', trafficLightName: '', DHT11Name: '', lightName: ''}
    
    //Dung ten cua device + username thay vi id
// }

export const addDeviceSet = async (req, res) => {

    //body: {id: '', setName: '', username: '', trafficLightName: '', DHT11Name: '', lightName: ''}
    
    //Dung ten cua device + username thay vi id

    const deviceSet = req.body;

    const oldTL = await DeviceModel.find({name : deviceSet.trafficLightname});
    if (!oldTL) return res.status(404).json({ message: "Traffic Light doesn't exist" });
    const oldDHT = await DeviceModel.find({name : deviceSet.DHT11Name});
    if (!oldDHT) return res.status(404).json({ message: "DHT11 doesn't exist" });
    const oldL = await DeviceModel.find({name : deviceSet.lightName});
    if (!oldL) return res.status(404).json({ message: "Light doesn't exist" });
 
    const oldUser = deviceSet.username
    if( !oldUser ) let newDeviceSetMessage = new DeviceSetModel(deviceSet.setName,"","", oldTL.trafficLightId, oldDHT.DHT11Id, oldL.lightId)
    else {
        let newDeviceSetMessage = new DeviceSetModel(deviceSet.setName,deviceSet.userID,"",oldTL.trafficLightId, oldDHT.DHT11Id, oldL.lightId)
        let user = UserModel
        user.findOneAndUpdate({username : deviceSet.username }, {devicesetname = deviceSet.setName},{new: true},(error, data) =>{
            if (error) {
                console.log(error)
            }
        })
    }
    try {
        await newDeviceSetMessage.save();

        res.status(201).json(newDeviceSetMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const addUser = async (req, res) => {
    const { deviceSetId, username } = req.body;

    const oldUser = await UserModel.findOne({ username });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
    
    const oldDeviceSet = await DeviceSetModel.findById(deviceSetId);
    
    if (!oldDeviceSet) return res.status(404).json({ message: "Device set doesn't exist" });
    
    const userID = oldUser._id;

    const updatedDeviceSet = await DeviceSetModel.findByIdAndUpdate(oldDeviceSet._id, { userID }, { new: true });

    const updatedUser = await UserModel.findByIdAndUpdate(userID, { deviceSetId }, { new: true } );

    res.json({updatedDeviceSet, updatedUser});
}

export const deleteDeviceSet = async (req, res) => {
    
    // req.params= {id: ''}
    // Neu set co user thi khong cho xoa
    const { id } = req.params;
    

    try {
        const oldDeviceSet = await DeviceSetModel.findById(id);

        if (!oldDeviceSet) {
            return res.status(404).json({ message: "DeviceSet doesn't exist." });
        }
        else if (!oldDeviceSet.userID) {
            await DeviceSetModel.findByIdAndRemove(id);
            return res.status(200).json({ message: "DeviceSet is deleted."});            
        }
        else return res.status(200).json({ message: "DeviceSet is belong to an user and cant be deleted"});
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}
export const getAdminDeviceSet = async (req, res) => {
    
    const { page, limit } = req.body;
    const skipIndex = (page - 1) * limit;
    let deviceSetMessage = [];

    try {
        deviceSetMessage = await DeviceSetModel.find()
        .sort({ _id: 1 })
        .skip(skipIndex)
        .limit(limit)

        res.status(200).json(deviceSetMessage);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCountDeviceSet = async (req, res) => {
    try {
        const numberOfDeviceSet = await DeviceSetModel.estimatedDocumentCount();

        res.status(200).json(numberOfDeviceSet);
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// deviceSet that has been used by user.
export const getCountUsedSet = async (req, res) => {
    try {
        const num = await DeviceSetModel.countDocuments( { userID: { $ne:"" } } );

        res.status(200).json(num);
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// deviceSet that has not been used by user.
export const getCountUnusedSet = async (req, res) => {
    try {
        const num = await DeviceSetModel.countDocuments( { userID: { $eq:"" } } );

        res.status(200).json(num);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
        
export const updateDeviceSet = async (req, res) => {
    
    // req.body = {id: '', setName: '', trafficLightId: '', DHT11Id: '', lightId: ''}

    //Them setName nen sua lai
    
    // const hay let ?????????
    let { id, setName, trafficlight, DTH11, Light} = req.body;

    const oldDevice = await DeviceSetModel.findById(id);

    //san pham khong ton tai
    if (!oldDevice) {
        return res.status(404).json({ message: "DeviceSet doesn't exist."});
    }

    if ((trafficlight == '' &&  DTH11 == '' && Light == '' && setName=='') || 
        (trafficlight==oldDevice.trafficLightId && DTH11==oldDevice.DHT11Id && Light==oldDevice.lightId && setName==oldDevice.setName)) {
        return res.status(200).json({ message: "Nothing was changed."});
    }

    if (trafficlight != oldDevice.trafficLightId) {
        if (trafficlight == '') {
            trafficlight = oldDevice.trafficLightId;
        }
    }
    
    if (DTH11 != oldDevice.DHT11Id) {
        if (DTH11 == '') {
            DTH11 = oldDevice.DHT11Id;
        }
    }

    if (Light != oldDevice.lightId) {
        if (Light == '') {
            Light = oldDevice.lightId;
        }
    }

    if (setName != oldDevice.setName) {
        if (setName == '') {
            setName = oldDevice.setName;
        }
        else {
            const oldSetName = await DeviceSetModel.findOne({ setName });
            if (oldSetName) return res.status(400).json({ message: "Set Name already exists" })
        }
    }

    let updateDeviceSet = { setName, trafficlight, DTH11, Light };

    try {
        const updatedDeviceSet = await DeviceSetModel.findByIdAndUpdate(id, updateDeviceSet, { new: true });
        res.status(200).json(updatedDeviceSet);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getNameSet = async (req, res) => {
    try {
        const array = await DeviceSetModel.find({ userID: "" }, { _id: 0, setName: 1 });
        let devicesetname = []
        for (let i = 0; i < array.length; i++) {
            devicesetname.push(array[i].setName)
        }
        res.status(200).json(devicesetname);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}