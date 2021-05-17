export default ( tldata = [], action) => {
    switch (action.type) {
      case 'FETCH_TL':
        return action.payload;
      default:
        return tldata;
    }
  };
  
  