import express from 'express';
import mongoose from 'mongoose';

import DeviceModel from '../models/device.js';

const router = express.Router();

export const getDevice = async (req, res) => { 
    
    try {
        const deviceMessage = await DeviceModel.find();

        res.status(200).json(deviceMessage);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addDevice = async (req, res) => {

    const device = req.body;

    const newDeviceMessage = new DeviceModel({...device, time: new Date().toUTCString()})

    try {
        await newDeviceMessage.save();

        res.status(201).json(newDeviceMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getAdminDevice = async (req, res) => {
    
    const { page, limit } = req.body;
    const skipIndex = (page - 1) * limit;
    let deviceMessage = [];

    try {
        deviceMessage = await DeviceModel.find()
        .sort({ _id: 1 })
        .skip(skipIndex)
        .limit(limit)

        res.status(200).json(deviceMessage);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCountDevice = async (req, res) => {
    try {
        const numberOfDevice = await DeviceModel.estimatedDocumentCount();

        res.status(200).json(numberOfDevice);
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

export const updateDevice = async (req, res) => {
    
    // req.body = {id: '', type: '', idServer: '', name: '', unit: '', topic: ''}
    const { id, type, idServer, name, unit, topic} = req.body;

    const oldDevice = await DeviceModel.findById(id);

    //san pham khong ton tai
    if (!oldDevice) {
        return res.status(404).json({ message: "Device doesn't exist."});
    }

    //check if nothing is changed
    if ( ((type==oldDevice.type)||(type='')) && ((idServer==oldDevice.idServer)||(idServer==''))
        && ((name==oldDevice.name)||(name=='')) && ((unit==oldDevice.unit)||(unit=='')) && 
        ((topic==oldDevice.topic)||(topic=='')) ) 
    {
        return res.status(200).json({ message: "Nothing was changed."});
    }

    if (type != oldDevice.type) {
        if (type == '') {
            type = oldDevice.type;
        }
    }
    
    if (idServer != oldDevice.idServer) {
        if (idServer == '') {
            idServer = oldDevice.idServer;
        }
    }

    if (name != oldDevice.name) {
        if (name == '') {
            name = oldDevice.name;
        }
    }

    if (unit != oldDevice.unit) {
        if (unit == '') {
            unit = oldDevice.unit;
        }
    }

    if (topic != oldDevice.topic) {
        if (topic == '') {
            topic = oldDevice.topic;
        }
    }

    let updateDevice = { type, idServer, name, unit, topic };

    const updatedDevice = await DeviceModel.findByIdAndUpdate(id, updateDevice, { new: true });

    //res.json({ result: updatedDevice });
    //?????????????
    res.status(200).json(updatedDevice);
}

export const deleteDevice = async (req, res) => {
    
    // req.params= {id: ''}
    const { id } = req.params;

    try {
        const oldDevice = await DeviceModel.findById(id);
        if (!oldDevice) {
            return res.status(404).json({ message: "Device doesn't exist." });
        }
        else {
            await DeviceModel.findByIdAndRemove(id);

            return res.status(200).json({ message: "Device is deleted."});            
        }
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}
