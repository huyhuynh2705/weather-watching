export default (username = [], action) => {
    switch (action.type) {
      case 'ADMIN_USERNAME':
        return action.payload;
      default:
        return username;
    }
  };
  