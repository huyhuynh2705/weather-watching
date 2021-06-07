export default (data = {dataBar: null, dataChart: null}, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return { ...data, dataBar: action.payload};
    case 'GET_CHART_DATA':
      return { ...data, dataChart: action.payload};
    default:
      return data;
  }
};

