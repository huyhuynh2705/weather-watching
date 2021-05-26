export default (countdevice = [], action) => {
    switch (action.type) {
      case 'DEVICE_COUNT':
        return action.payload;
      case 'ADD_DEVICE':
        return countdevice + 1;
      default:
        return countdevice;
    }
  };
  