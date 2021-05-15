import { combineReducers } from 'redux';

import auth from './auth';
import data from './data';
import device from './device';
import deviceset from './deviceset';

export default combineReducers({auth, data, device, deviceset});