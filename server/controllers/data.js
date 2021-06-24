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
    
        //const deviceSetId = oldUser.deviceSetId;
    
        const oldDeviceSet = await DeviceSetModel.findOne({setName: oldUser.deviceSetName})
        if (!oldDeviceSet) return res.status(404).json({ message: "Device set doesn't exist" });
        
        const trafficLightId =  {deviceId: oldDeviceSet.trafficLightId}
        let trafficLightValue = await DataModel.find( trafficLightId )
        const lightId =  {deviceId: oldDeviceSet.lightId}
        const lightValue = await DataModel.find( lightId )
        const DHT11Id =  {deviceId: oldDeviceSet.DHT11Id}
        const DHT11Value = await DataModel.find( DHT11Id )

        let tlvalues = []
        let lvalues = []
        let dhtvalues = []


        if (trafficLightValue.length >= 10) {
            for (let i = (trafficLightValue.length - 1); i >= (trafficLightValue.length - 10); i--) {
                let tlObj = trafficLightValue[i]
                tlObj.convertedTime = String(trafficLightValue[i].time.toString())
                tlvalues.push(tlObj)
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


    try {
        await newDataMessage.save();

        res.status(201).json(newDataMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getChartData = async (req, res) => {
    // //Example for this api
    // let pre = new Date(); 
    // let cons = pre.toUTCString();
    // let second = Date.parse(cons)/ 1000;
    // let array = new Array();
    // array.push(1);
    // array[1] = 2;
    // array.push(3);
    // let min = Math.min(...array);   
    // let avg = array.reduce((a, b) => a + b, 0)/array.length; 
    try {
        const { id } = req.params;
        const User = await UserModel.findById(id)
        if (!User) return res.status(404).json({ message: "User doesn't exist" });
        const Set = await DeviceSetModel.findOne({setName: User.deviceSetName})
        const Traffic = await DataModel.find({ deviceId: Set.trafficLightId });
        const DHT11 = await DataModel.find({ deviceId: Set.DHT11Id });
        const Light = await DataModel.find({ deviceId: Set.lightId });

        //Light section
        let minLight = []; 
        let maxLight = [];
        let avgLight = [];
        const lastLightTime = Light[Light.length-1].time.getTime()/1000;
        let resultArray = [];
        let j = 0;
        for (let i = Light.length-1; i>=0; i--) {
            let thisTime = Light[i].time.getTime()/1000;
            if (thisTime<=(lastLightTime-60*60*j) && thisTime>=(lastLightTime-60*60*(j+1))) {
                resultArray.push(Light[i].value);
            }
            if (Light[i-1]) {
                let preTime = Light[i-1].time.getTime()/1000; 
                if (preTime < (lastLightTime-60*60*(j+1))) {
                    minLight.push(Math.min(...resultArray));
                    maxLight.push(Math.max(...resultArray))
                    avgLight.push(Math.floor(resultArray.reduce((a, b) => (parseInt(a) + parseInt(b)), 0)/resultArray.length));
                    j++;
                    i++;
                    resultArray = [];
                }
            }
            else if (!Light[i-1]) {
                minLight.push(Math.min(...resultArray));
                maxLight.push(Math.max(...resultArray))
                avgLight.push(Math.floor(resultArray.reduce((a, b) => (parseInt(a) + parseInt(b)), 0)/resultArray.length));
                j++;
                i++;
                resultArray = [];
            }
            if (j==7) {
                break;
            }
        }
        let light = {min: minLight, max: maxLight, avg: avgLight};
        //===========================================================================================
            
        //Traffic Light section
        let count01 = 0;
        let count10 = 0;
        let count11 = 0;
        let lastTrafficTime = Traffic[Traffic.length-1].time.getTime()/1000;
        // let x = [];
        for (let i=(Traffic.length-1); i>=0; i--) {
            let thisTime = Traffic[i].time.getTime()/1000;
            let delta = lastTrafficTime - thisTime
            if (thisTime<=lastTrafficTime && thisTime>=(lastTrafficTime-60*60*7)) {
                if (Traffic[i].value == "01") {
                    count01+=delta;
                }
                else if (Traffic[i].value == "10") {
                    count10+=delta;
                }
                else if (Traffic[i].value == "11") {
                    count11+=delta;
                }
            }
            else {
                break;
            }
            lastTrafficTime = thisTime
        }
        let traffic = [Number((count01/60).toFixed(2)), Number((count10/60).toFixed(2)), Number((count11/60).toFixed(2))];
        if (Traffic.length == 1) {
            if (Traffic[0].value == '01') traffic = [1, 0, 0];
            if (Traffic[0].value == '10') traffic = [0, 1, 0];
            if (Traffic[0].value == '11') traffic = [0, 0, 1];
        }
        //=====================================================================

        //DHT11 section
        let minTemp = []; 
        let maxTemp = [];
        let avgTemp = [];
        let minHum = []; 
        let maxHum = [];
        let avgHum = [];
        const lastDht11Time = DHT11[DHT11.length-1].time.getTime()/1000;
        let tempArray = [];
        let humArray = [];
        j = 0;
        for (let i = DHT11.length-1; i>=0; i--) {
            let thisTime = DHT11[i].time.getTime()/1000;
            if (thisTime<=(lastDht11Time-60*60*j) && thisTime>=(lastDht11Time-60*60*(j+1))) {
                tempArray.push(DHT11[i].value);
                humArray.push(DHT11[i].value2);
            }
            if (DHT11[i-1]) {
                let preTime = DHT11[i-1].time.getTime()/1000; 
                if (preTime < (lastDht11Time-60*60*(j+1))) {
                    minTemp.push(Math.min(...tempArray));
                    maxTemp.push(Math.max(...tempArray))
                    avgTemp.push(Math.floor(tempArray.reduce((a, b) => (parseInt(a) + parseInt(b)), 0)/tempArray.length));
                    minHum.push(Math.min(...humArray));
                    maxHum.push(Math.max(...humArray))
                    avgHum.push(Math.floor(humArray.reduce((a, b) => (parseInt(a) + parseInt(b)), 0)/humArray.length));
                    j++;
                    i++;
                    tempArray = [];
                    humArray = [];
                }
            }
            else if (!DHT11[i-1]) {
                minTemp.push(Math.min(...tempArray));
                maxTemp.push(Math.max(...tempArray))
                avgTemp.push(Math.floor(tempArray.reduce((a, b) => (parseInt(a) + parseInt(b)), 0)/tempArray.length));
                minHum.push(Math.min(...humArray));
                maxHum.push(Math.max(...humArray))
                avgHum.push(Math.floor(humArray.reduce((a, b) => (parseInt(a) + parseInt(b)), 0)/humArray.length));
                j++;
                i++;
                tempArray = [];
                humArray = [];
            }
            if (j==7) {
                break;
            }
        }
        let temp = {min: minTemp, max: maxTemp, avg: avgTemp};
        let hum = {min: minHum, max: maxHum, avg: avgHum};
        //===========================================================================================
        let dhtHour = String(DHT11[DHT11.length-1].time.getHours()) < 10 ? "0" +  String(DHT11[DHT11.length-1].time.getHours()) : String(DHT11[DHT11.length-1].time.getHours())
        let dhtMinute = String(DHT11[DHT11.length-1].time.getMinutes()) < 10 ? "0" +  String(DHT11[DHT11.length-1].time.getMinutes()) : String(DHT11[DHT11.length-1].time.getMinutes())
        let lightHour = String(Light[Light.length-1].time.getHours()) < 10 ? "0" +  String(Light[Light.length-1].time.getHours()) : String(Light[Light.length-1].time.getHours())
        let lightMinute = String(Light[Light.length-1].time.getMinutes()) < 10 ? "0" +  String(Light[Light.length-1].time.getMinutes()) : String(Light[Light.length-1].time.getMinutes())

        const result = {
            trafficLight: traffic, 
            temperature: temp, 
            humidity: hum, 
            light: light, 
            dhtTime: dhtHour + ":" + dhtMinute, 
            lightTime: lightHour + ":" + lightMinute }
        res.status(200).json(result);     
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
    
}