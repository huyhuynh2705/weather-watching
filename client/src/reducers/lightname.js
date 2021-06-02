export default (devicesetname = [], action) => {
    switch (action.type) {
      case 'ADMIN_NAME_LIGHT':
        return action.payload;
      default:
        return devicesetname;
    }
  };
  