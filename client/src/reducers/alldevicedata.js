export default (alldevicedata = [], action) => {
    switch (action.type) {
      case 'GET_ALL_DATA':
        return action.payload;
      default:
        return alldevicedata;
    }
  };
  
  