export default (countuser = [], action) => {
    switch (action.type) {
      case 'USER_COUNT':
        return action.payload;
      case 'ADD_USER':
        return countuser + 1;
      default:
        return countuser;
    }
  };
  