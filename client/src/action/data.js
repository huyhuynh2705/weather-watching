import * as api from '../api/index'

export const getData = (id) => async (dispatch) => {
    try {
      const { data } = await api.fetchData(id);

      dispatch({ type: 'FETCH_ALL', payload: data });

    } catch (error) {
      console.log(error.response);
    }
  };
  