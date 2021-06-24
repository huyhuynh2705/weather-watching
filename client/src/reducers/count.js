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
            if (action.payload.userID) return { ...state, devicesets: state.devicesets + 1, subscribers: state.subscribers + 1};
            return { ...state, devicesets: state.devicesets + 1, unusedsets: state.unusedsets +1}
        case 'DELETE_DEVICE_SET':
            return { ...state, devicesets: state.devicesets - 1, unusedsets: state.unusedsets - 1};
        case 'UNUSED_DEVICE_SET_COUNT':
            return { ...state, unusedsets: action.payload};
        case 'USER_COUNT_ALL':
            return { ...state, users: action.payload};
        case 'ADD_USER':
            if (action.payload.deviceSetName) return { ...state, users: state.users + 1, subscribers: state.subscribers + 1, unusedsets: state.unusedsets - 1};
            return { ...state, users: state.users + 1}
        case 'DELETE_USER':
            if (action.payload.deviceSetName) return { ...state, users: state.users - 1, subscribers: state.subscribers - 1, unusedsets: state.unusedsets + 1};
            return { ...state, users: state.users - 1}
        case 'SUBSCRIBE_USER_COUNT':
            return { ...state, subscribers: action.payload};
        default:
            return state;
    }
  };
  

//   export default (state = { devices: null, devicesets: null, users: null, subscribers: null, unusedsets: null }, action) => {
//     switch (action.type) {
//         case 'DEVICE_COUNT':
//             return { ...state, devices: action.payload};
//         case 'ADD_DEVICE':
//             return { ...state, devices: state.devices + 1};
//         case 'DELETE_DEVICE':
//             return { ...state, devices: state.devices - 1};
//         case 'DEVICE_SET_COUNT':
//             return { ...state, devicesets: action.payload};
//         case 'ADD_DEVICE_SET':
//             if (action.payload.userID) return { ...state, devicesets: state.devicesets + 1};
//             return { ...state, devicesets: state.devicesets + 1, unusedsets: state.unusedsets +1}
//         case 'DELETE_DEVICE_SET':
//             return { ...state, devicesets: state.devicesets - 1, unusedsets: state.unusedsets - 1};
//         case 'UPDATE_DEVICE_SET':
//             return { ...state, unusedsets: action.payload};
//             // if (action.payload.userID) return { ...state, unusedsets: state.unusedsets - 1};
//             // else return { ...state, unusedsets: state.unusedsets + 1}
//         case 'UNUSED_DEVICE_SET_COUNT':
//             return { ...state, unusedsets: action.payload};
//         case 'USER_COUNT_ALL':
//             return { ...state, users: action.payload};
//         case 'ADD_USER':
//             return { ...state, users: state.users + 1};
//         case 'DELETE_USER':
//             return { ...state, users: state.users - 1};    
//         case 'SUBSCRIBE_USER_COUNT':
//             return { ...state, subscribers: action.payload};
//         default:
//             return state;
//     }
//   };
  