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

export const getAdminDevice = async (req, res, next) => {
    // {
    //     "page" = "1",
    //     "limit" = "10"
    // }

    // ref: 
    // https://www.thanhlongdev.com/huong-dan-xay-dung-pagination-voi-nodejs-express-va-mongodb/
    // https://betterprogramming.pub/build-a-paginated-api-using-node-js-express-and-mongodb-227ed5dc2b4b
    const { page, limit } = req.body;
    const skipIndex = (page - 1) * limit;
    const results = {};

    // Get limit phần tử trong trang page
    try {
        results.results = await DeviceModel.find()
            .sort({ _id: 1 })
            .limit(limit)
            .skip(skipIndex)
            .exec();
        res.getAdminDevice = results;
        next();
        //res.status(200).json(deviceMessage);
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
