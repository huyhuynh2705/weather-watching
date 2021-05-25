export default (count = [], action) => {
    switch (action.type) {
      case 'DEVICE_COUNT':
        return action.payload;
      default:
        return count;
    }
  };
  