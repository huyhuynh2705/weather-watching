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

    const newDeviceMessage = new DeviceModel(device)

    try {
        await newDeviceMessage.save();

        res.status(201).json(newDeviceMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// export const getAdminDevice = async (req, res) => {

//     // {
//     //     "page" = "1",
//     //     "limit" = "10"
//     // }

//     const { page, limit } = req.body

//     // Get limit phần tử trong trang page
// }

// export const getCountDevice = async (req, res) => {


// }
