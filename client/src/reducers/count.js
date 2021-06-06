export default (state = { devices: null, devicesets: null, users: null, subscribers: null, unusedsets: null }, action) => {
    switch (action.type) {
        case 'DEVICE_COUNT':
            return { ...state, devices: action.payload};
        case 'ADD_DEVICE':
            return { ...state, devices: state.devices + 1};
        case 'DELETE_DEVICE':
            return { ...state, devices: state.devices - 1};
        case 'DEVICE_SET_COUNT':
            return { ...state, devicesets: action.payload};
        case 'ADD_DEVICE_SET':
            return { ...state, devicesets: state.devicesets + 1};
        case 'DELETE_DEVICE_SET':
            return { ...state, devicesets: state.devicesets - 1};
        case 'UNUSED_DEVICE_SET_COUNT':
            return { ...state, unusedsets: action.payload};
        case 'USER_COUNT_ALL':
            return { ...state, users: action.payload};
        case 'ADD_USER':
            return { ...state, users: state.users + 1};
        case 'DELETE_USER':
            return { ...state, users: state.users - 1};    
        case 'SUBSCRIBE_USER_COUNT':
            return { ...state, subscribers: action.payload};
        default:
            return state;
    }
  };
  