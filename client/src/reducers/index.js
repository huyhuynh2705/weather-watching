import { combineReducers } from 'redux';

import auth from './auth';
import data from './data';
import devices from './devices';
import deviceset from './deviceset';
import alldevicedata from './alldevicedata';
import users from './users';
import count from './count';
import names from './names';

const appReducer = combineReducers({
    auth, data, devices, deviceset, alldevicedata, users, count, names
});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        return appReducer(undefined, action)
      }
    
      return appReducer(state, action)
}

export default rootReducer