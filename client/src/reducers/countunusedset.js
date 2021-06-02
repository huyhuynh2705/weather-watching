export default (countdeviceset = [], action) => {
    switch (action.type) {
      case 'UNUSED_DEVICE_SET_COUNT':
        return action.payload;
      default:
        return countdeviceset;
    }
  };
  