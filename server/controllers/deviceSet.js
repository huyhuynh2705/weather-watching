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

export const addDeviceSet = async (req, res) => {

    const deviceSet = req.body;

    const oldTL = await DeviceModel.findById(deviceSet.trafficLightId);

    if (!oldTL) return res.status(404).json({ message: "Traffic Light doesn't exist" });

    const oldDHT = await DeviceModel.findById(deviceSet.DHT11Id);

    if (!oldDHT) return res.status(404).json({ message: "DHT11 doesn't exist" });

    const oldL = await DeviceModel.findById(deviceSet.lightId);

    if (!oldL) return res.status(404).json({ message: "Light doesn't exist" });

    const newDeviceSetMessage = new DeviceSetModel(deviceSet)

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
    const { id } = req.params;

    try {
        const oldDeviceSet = await DeviceSetModel.findById(id);
        if (!oldDeviceSet) {
            return res.status(404).json({ message: "DeviceSet doesn't exist." });
        }
        else {
            await DeviceSetModel.findByIdAndRemove(id);

            return res.status(200).json({ message: "DeviceSet is deleted."});            
        }
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}
export const getAdminSet = async (req, res) => {
    
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