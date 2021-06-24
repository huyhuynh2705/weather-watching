export default (deviceset = [], action) => {
    switch (action.type) {
      case 'ADMIN_DEVICE_SET':
        return action.payload;
      case 'UPDATE_DEVICE_SET':
        return deviceset.map((set) => (set._id === action.payload._id ? action.payload : set));
      case 'DELETE_DEVICE_SET':
        return deviceset.filter((set) => set._id !== action.payload._id);
      case 'ADD_DEVICE_SET':
        if (deviceset.length < 5 ) return [...deviceset, action.payload]
      default:
        return deviceset;
    }
  };
  