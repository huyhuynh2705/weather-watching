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
  
  // export const getTrafficLightData = (id) => async (dispatch) => {
  //   try {
  //     const { data } = await api.getTrafficLightData(id);

  //     dispatch({ type: 'FETCH_TL', payload: data });

  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };

  // export const getLightData = (id) => async (dispatch) => {
  //   try {
  //     const { data } = await api.getLightData(id);

  //     dispatch({ type: 'FETCH_L', payload: data });

  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };
  