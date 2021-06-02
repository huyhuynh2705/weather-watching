import { combineReducers } from 'redux';

import auth from './auth';
import data from './data';
import devices from './devices';
import deviceset from './deviceset';
import alldevicedata from './alldevicedata';
import countdevice from './countdevice';
import countdeviceset from './countdeviceset';
import users from './users';
import countuser from './countuser';
import devicesetname from './devicesetname';
import trafficlightname from './trafficlightname';
import dht11name from './dht11name';
import lightname from './lightname';
import countunusedset from './countunusedset';
import countsubscriber from './countsubscriber';


export default combineReducers({
    auth, data, devices, deviceset, alldevicedata, 
    countdevice, countdeviceset, users, countuser, 
    devicesetname, trafficlightname, dht11name, lightname,
    countunusedset, countsubscriber});