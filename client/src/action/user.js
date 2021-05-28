import * as api from '../api/index'


export const signUp = (form) => async (dispatch) => {
    try {
      const { data } = await api.signUp(form)
  
      dispatch({ type: 'ADD_USER', data })
  
    } catch (error) {
      console.log(error)
      alert(error.response.data.message)
    }
  }
  
  export const getAdminUser = (form) => async (dispatch) => {
    try {
      
      const { data } = await api.getAdminUser(form);
  
      dispatch({ type: 'ADMIN_USER', payload: data });
  
    } catch (error) {
      console.log(error.response);
    }
  };
  
  export const getCountUser = () => async (dispatch) => {
    try {
      
      const { data } = await api.getCountUser();
  
      dispatch({ type: 'USER_COUNT', payload: data });
  
    } catch (error) {
      console.log(error);
    }
  };
  
  export const deleteUser = (id) => async (dispatch) => {
    try {
      
      await api.deleteUser(id);
  
      const { data } = await api.getCountUser();
      
      dispatch({ type: 'USER_COUNT', payload: data });
      
      dispatch({ type: 'DELETE_USER', payload: id });
  
    } catch (error) {
      console.log(error);
    }
  };
    
  export const updateUser = (form) => async (dispatch) => {
    try {
      
      const { data } = await api.updateUser(form);
  
      dispatch({ type: 'UPDATE_USER', payload: data });
  
    } catch (error) {
      console.log(error);
    }
  };
  