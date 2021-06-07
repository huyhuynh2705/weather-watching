import * as api from '../api/index'

export const getData = (id) => async (dispatch) => {
    try {
      const { data } = await api.fetchData(id);

      dispatch({ type: 'GET_DATA', payload: data });

    } catch (error) {
      console.log(error.response);
    }
  };

  export const getAllDeviceData = (id) => async (dispatch) => {
    try {
      const { data } = await api.getAllDeviceData(id);

      dispatch({ type: 'GET_ALL_DATA', payload: data });

    } catch (error) {
      console.log(error.response);
    }
  };

  export const getChartData = (id) => async (dispatch) => {
    try {
      const { data } = await api.getChartData(id);

      dispatch({ type: 'GET_CHART_DATA', payload: data });

    } catch (error) {
      console.log(error.response);
    }
  };
  