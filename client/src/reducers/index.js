import { combineReducers } from 'redux';

import auth from './auth';
import data from './data';
import devices from './devices';
import deviceset from './deviceset';
import alldevicedata from './alldevicedata';
import countdevice from './countdevice';

export default combineReducers({auth, data, devices, deviceset, alldevicedata, countdevice});