export default (devicesetname = [], action) => {
    switch (action.type) {
      case 'ADMIN_NAME_DHT11':
        return action.payload;
      default:
        return devicesetname;
    }
  };
  