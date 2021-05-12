import express from 'express';
import mongoose from 'mongoose';

import DataMessage from '../models/data.js';

const router = express.Router();

export const getData = async (req, res) => { 
    const deviceSetId = req.body;
    
    try {
        const dataMessage = await DataMessage.find(deviceSetId);

        if (!dataMessage) return res.status(404).json({ message: "Id doesn't exist" });

        res.status(200).json(dataMessage);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addData = async (req, res) => {
    const data = req.body;

    console.log(data)

    const newDataMessage = new DataMessage({...data, time: new Date().toISOString()})

    try {
        await newDataMessage.save();

        res.status(201).json(newDataMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
