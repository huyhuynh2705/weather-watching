export default (deviceset = [], action) => {
    switch (action.type) {
      case 'ADDDEVICESET':
          return [...deviceset, action.payload];
      // case LIKE:
      //   return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
      // case CREATE:
      //   return [...posts, action.payload];
      // case UPDATE:
      //   return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
      // case DELETE:
      //   return posts.filter((post) => post._id !== action.payload);
      default:
        return deviceset;
    }
  };
  