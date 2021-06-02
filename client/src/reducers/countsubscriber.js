export default (countdeviceset = [], action) => {
    switch (action.type) {
      case 'SUBSCRIBE_USER_COUNT':
        return action.payload;
      default:
        return countdeviceset;
    }
  };
  