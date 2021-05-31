export default (devicesetname = [], action) => {
    switch (action.type) {
      case 'ADMIN_NAME_DEVICE_SET':
        return action.payload;
      default:
        return devicesetname;
    }
  };
  