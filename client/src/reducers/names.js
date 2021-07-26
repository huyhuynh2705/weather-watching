export default (state = {usernames: null, tlnames: null, dhtnames: null, lnames: null, setnames: null}, action) => {
    switch (action.type) {
        case 'ADMIN_USERNAME':
            return { ...state, usernames: action.payload};
        case 'ADMIN_NAME_TRAFFIC_LIGHT':
            return { ...state, tlnames: action.payload};
        case 'ADMIN_NAME_DHT11':
            return { ...state, dhtnames: action.payload};
        case 'ADMIN_NAME_LIGHT':
            return { ...state, lnames: action.payload};
        case 'ADMIN_NAME_DEVICE_SET':
            return { ...state, setnames: action.payload};
        default:
            return state;
    }
  };
  