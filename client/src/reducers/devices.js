export default (devices = [], action) => {
  switch (action.type) {
    case 'ADMIN_DEVICE':
      return action.payload;
    case 'ADD_DEVICE':
        return [...devices, action.payload];
    case 'UPDATE_DEVICE':
      return devices.map((device) => (device._id === action.payload._id ? action.payload : device));
    case 'DELETE_DEVICE':
      return devices.filter((device) => device._id !== action.payload);
    default:
      return devices;
  }
};
