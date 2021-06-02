export default (countdeviceset = [], action) => {
    switch (action.type) {
      case 'DEVICE_SET_COUNT':
        return action.payload;
      case 'ADD_DEVICE_SET':
        return countdeviceset + 1;
      default:
        return countdeviceset;
    }
  };
  