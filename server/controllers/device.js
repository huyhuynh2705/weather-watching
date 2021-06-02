import express from 'express';
import mongoose from 'mongoose';

import DeviceModel from '../models/device.js';
import deviceSetModel from '../models/deviceSet.js'

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

    //const device = req.body;
    const {type, idServer, name, unit, topic} = req.body;
    
    const device = {type, idServer, name, unit, topic}
    
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
    let { id, type, idServer, name, unit, topic} = req.body;


    const oldDevice = await DeviceModel.findById(id);

    //san pham khong ton tai
    if (!oldDevice) {
        return res.status(404).json({ message: "Device doesn't exist."});
    }

    if ((type == '' &&  idServer == '' && name == '' && unit == '' && topic == '') || 
        (type==oldDevice.type && idServer==oldDevice.idServer && name==oldDevice.name && unit==oldDevice.unit && topic==oldDevice.topic)) {
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
        if (unit == '' && type != 'Light') {
            unit = oldDevice.unit;
        }
    }

    if (topic != oldDevice.topic) {
        if (topic == '') {
            topic = oldDevice.topic;
        }
    }

    let updateDevice = { type, idServer, name, unit, topic };

    try {
        const updatedDevice = await DeviceModel.findByIdAndUpdate(id, updateDevice, { new: true });
        res.status(200).json(updatedDevice);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
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

//all name
export const getTrafficlightName = async (req, res) => {
    try {
        const array = await DeviceModel.find({ type: "Traffic Light" }, { _id: 1 , name: 1 } );
        let devicename = []
        for (let i = 0; i < array.length; i++) {
            const device = await deviceSetModel.findOne( { 'trafficLightId': array[i].id } )
            if (!device) {
                devicename.push(array[i].name)
            }
        }
        res.status(200).json(devicename);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getDHT11Name = async (req, res) => {
    try {
        const array = await DeviceModel.find({ type: "DHT11" }, { _id: 1 , name: 1 } );
        let devicename = []
        for (let i = 0; i < array.length; i++) {
            const device = await deviceSetModel.findOne( { 'DHT11Id': array[i].id } )
            if (!device) {
                devicename.push(array[i].name)
            }
        }
        res.status(200).json(devicename);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getLightName = async (req, res) => {
    try {
        const array = await DeviceModel.find({ type: "Light" }, { _id: 1 , name: 1 } );
        let devicename = []
        for (let i = 0; i < array.length; i++) {
            const device = await deviceSetModel.findOne( { 'lightId': array[i].id } )
            if (!device) {
                devicename.push(array[i].name)
            }
        }
        res.status(200).json(devicename);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

