import express from 'express';
import mongoose from 'mongoose';

import DataModel from '../models/data.js';
import UserModel from '../models/user.js';
import DeviceSetModel from '../models/deviceSet.js';
import DeviceModel from '../models/device.js';

const router = express.Router();



export const getAllDeviceData = async (req, res) => { 

    try {
        const { id } = req.params;

        const oldUser = await UserModel.findById(id);
        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
    
        const deviceSetId = oldUser.deviceSetId;
    
        const oldDeviceSet = await DeviceSetModel.findOne({setName: oldUser.deviceSetName})
        if (!oldDeviceSet) return res.status(404).json({ message: "Device set doesn't exist" });
        
        const trafficLightId =  {deviceId: oldDeviceSet.trafficLightId}
        const trafficLightValue = await DataModel.find( trafficLightId )
        const lightId =  {deviceId: oldDeviceSet.lightId}
        const lightValue = await DataModel.find( lightId )
        const DHT11Id =  {deviceId: oldDeviceSet.DHT11Id}
        const DHT11Value = await DataModel.find( DHT11Id )

        let tlvalues = []
        let lvalues = []
        let dhtvalues = []


        if (trafficLightValue.length >= 10) {
            for (let i = (trafficLightValue.length - 1); i >= (trafficLightValue.length - 10); i--) {
                tlvalues.push(trafficLightValue[i])
            }
        } else {
            for (let i = (trafficLightValue.length - 1); i >= 0; i--) {
                tlvalues.push(trafficLightValue[i])
            }
        }

        if (lightValue.length >= 10) {
            for (let i = (lightValue.length - 1); i >= (lightValue.length - 10); i--) {
                lvalues.push(lightValue[i])
            }
        } else {
            for (let i = (lightValue.length - 1); i >= 0; i--) {
                lvalues.push(lightValue[i])
            }
        }

        if (DHT11Value.length >= 10) {
            for (let i = (DHT11Value.length - 1); i >= (DHT11Value.length - 10); i--) {
                dhtvalues.push(DHT11Value[i])
            }
        } else {
            for (let i = (DHT11Value.length - 1); i >= 0; i--) {
                dhtvalues.push(DHT11Value[i])
            }
        }

        const dataMessage = {tlvalues, lvalues, dhtvalues}

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

    const oldDeviceSet = await DeviceSetModel.findOne({setName: oldUser.deviceSetName})
    if (!oldDeviceSet) return res.status(404).json({ message: "Device set doesn't exist" });

    const trafficLightId =  {deviceId: oldDeviceSet.trafficLightId}
    const DHT11Id =  {deviceId: oldDeviceSet.DHT11Id}
    const lightId =  {deviceId: oldDeviceSet.lightId}
    
    const trafficLightValue = await DataModel.find( trafficLightId )
    const DHT11Value = await DataModel.find( DHT11Id )
    const lightValue = await DataModel.find( lightId )

    if (trafficLightValue.length == 0) { trafficLightValue.push({value: null})}
    if (lightValue.length == 0) { lightValue.push({value: null})}
    if (DHT11Value.length == 0) { lightValue.push({value: null, value2: null})}

    const dataMessage = {condition: trafficLightValue[trafficLightValue.length-1].value, temperature: DHT11Value[DHT11Value.length-1].value, humidity: DHT11Value[DHT11Value.length-1].value2, light: lightValue[lightValue.length-1].value};

    res.status(200).json(dataMessage);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addData = async (req, res) => {
    const data = req.body;

    const newDataMessage = new DataModel({...data, time: new Date().toUTCString()})

    // const test = new Date()
    // console.log(test.toUTCString())

    try {
        await newDataMessage.save();

        res.status(201).json(newDataMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getChartData = async (req, res) => {
    // Lay du lieu den giao thong trong x gio gan day, dem xem co bao nhieu gia tri den xanh (01), vang (10), do (11) roi tra
    // ve object {trafficLight: [ soluong01, soluong10, soluong11 ], temperature: ..., humidity:..., light: ...} 
    const { id } = req.params;
    try {
        // Hint:
        const trafficLight = [1, 2, 4]
        const temperature = {min:[1, 1, 1, 1, 1, 1, 1], max:[5, 5, 5, 5, 5, 5, 5], avg:[3, 3, 3, 3, 3, 3, 3]}
        const humidity = {min:[1, 1, 1, 1, 1, 1, 1], max:[5, 5, 5, 5, 5, 5, 5], avg:[3, 3, 3, 3, 3, 3, 3]}
        const light = {min:[1, 1, 1, 1, 1, 1, 1], max:[5, 5, 5, 5, 5, 5, 5], avg:[3, 3, 3, 3, 3, 3, 3]}
        const result = {trafficLight: trafficLight, temperature: temperature, humidity: humidity, light: light}
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}