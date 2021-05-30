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

export default combineReducers({auth, data, devices, deviceset, alldevicedata, countdevice, countdeviceset, users, countuser});