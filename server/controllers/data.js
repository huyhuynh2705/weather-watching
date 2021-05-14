import express from 'express';
import mongoose from 'mongoose';

import DataModel from '../models/data.js';
import UserModel from '../models/user.js';
import DeviceSetModel from '../models/deviceSet.js';
import DeviceModel from '../models/device.js';

const router = express.Router();

export const getAllData = async (req, res) => { 
    try {
        const dataMessage = await DataModel.find();

        res.status(200).json(dataMessage);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getData = async (req, res) => { 
    
    try {
    const { id } = req.params;

    const oldUser = await UserModel.findById(id);
    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const deviceSetId = oldUser.deviceSetId;

    const oldDeviceSet = await DeviceSetModel.findOne({ deviceSetId })
    if (!oldDeviceSet) return res.status(404).json({ message: "Device set doesn't exist" });

    const trafficLightId =  {deviceId: oldDeviceSet.trafficLightId}
    const DHT11Id =  {deviceId: oldDeviceSet.DHT11Id}
    const lightId =  {deviceId: oldDeviceSet.lightId}
    
    // Trafic light tạm thời để giá trị, sau này sẽ tính toán từ 3 giá trị kia rồi trả về sau
    const trafficLightValue = await DataModel.find( trafficLightId )
    const DHT11Value = await DataModel.find( DHT11Id )
    const lightValue = await DataModel.find( lightId )

    const dataMessage = {condition: trafficLightValue[trafficLightValue.length-1].value, temperature: DHT11Value[DHT11Value.length-1].value, humidity: DHT11Value[DHT11Value.length-1].value2, light: lightValue[lightValue.length-1].value};

    res.status(200).json(dataMessage);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addData = async (req, res) => {
    const data = req.body;

    const newDataMessage = new DataModel({...data, time: new Date().toISOString()})

    try {
        await newDataMessage.save();

        res.status(201).json(newDataMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
