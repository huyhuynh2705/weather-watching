import * as api from '../api/index'

export const getData = (id) => async (dispatch) => {
    try {
      const { data } = await api.fetchData(id);

      dispatch({ type: 'GET_DATA', payload: data });

    } catch (error) {
      console.log(error.response);
    }
  };
  
  export const getAllData = () => async (dispatch) => {
    try {
      const { data } = await api.getAllData();

      dispatch({ type: 'FETCH_TL', payload: data });

    } catch (error) {
      console.log(error.response);
    }
  };
  