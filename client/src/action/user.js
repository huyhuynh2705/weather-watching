import * as api from '../api/index'


export const addUser = (form) => async (dispatch) => {
    try {
      const { data } = await api.addUser(form)
  
      dispatch({ type: 'ADD_USER', payload: data })

      alert("User Added")
  
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
  
  export const getCountAllUser = () => async (dispatch) => {
    try {
      
      const { data } = await api.getCountAllUser();
  
      dispatch({ type: 'USER_COUNT_ALL', payload: data });
  
    } catch (error) {
      console.log(error.response);
    }
  };

  export const countSubscriber = () => async (dispatch) => {
    try {
      
      const { data } = await api.countSubscriber();
  
      dispatch({ type: 'SUBSCRIBE_USER_COUNT', payload: data });
  
    } catch (error) {
      console.log(error.response);
    }
  };
  
  export const deleteUser = (id) => async (dispatch) => {
    try {
      
      await api.deleteUser(id);
  
      dispatch({ type: 'DELETE_USER', payload: id });
  
    } catch (error) {
      console.log(error.response);
    }
  };
    
  export const updateUser = (form) => async (dispatch) => {
    try {
      
      const { data } = await api.updateUser(form);
  
      dispatch({ type: 'UPDATE_USER', payload: data });
  
    } catch (error) {
      alert(error.response.data.message);
      console.log(error.response);
    }
  };
  
  export const getUserName = () => async (dispatch) => {
    try {
      
      const { data } = await api.getUserName();
  
      dispatch({ type: 'ADMIN_USERNAME', payload: data });
  
    } catch (error) {
      console.log(error.response);
    }
  }