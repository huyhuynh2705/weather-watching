import * as api from '../api/index'

export const getData = () => async (dispatch) => {
    try {
      const { data } = await api.fetchData();

      dispatch({ type: 'FETCH_ALL', payload: data });

    } catch (error) {
      console.log(error.response);
    }
  };
  