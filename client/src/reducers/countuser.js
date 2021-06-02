export default (countuser = [], action) => {
    switch (action.type) {
      case 'USER_COUNT_ALL':
        return action.payload;
      case 'ADD_USER':
        return countuser + 1;
      case 'DELETE_USER':
        return countuser - 1;
      default:
        return countuser;
    }
  };
  