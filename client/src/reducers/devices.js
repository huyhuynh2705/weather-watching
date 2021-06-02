export default (devices = [], action) => {
  switch (action.type) {
    case 'ADMIN_DEVICE':
      return action.payload;z
    case 'UPDATE_DEVICE':
      return devices.map((device) => (device._id === action.payload._id ? action.payload : device));
    case 'DELETE_DEVICE':
      return devices.filter((device) => device._id !== action.payload);
    case 'ADD_DEVICE':
      if (devices.length < 5 ) {return [...devices, action.payload]}
    default:
      return devices;
  }
};
