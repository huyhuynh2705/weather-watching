import * as api from '../api/index'

export const addDevice = (form) => async (dispatch) => {
  try {
    const { data } = await api.addDevice(form)

    dispatch({ type: 'ADD_DEVICE', payload: data })
    
  } catch (error) {
    console.log(error.response)
  }
}

export const getAdminDevice = (form) => async (dispatch) => {
  try {
    const { data } = await api.getAdminDevice(form);

    dispatch({ type: 'ADMIN_DEVICE', payload: data });

  } catch (error) {
    console.log(error.response);
  }
};

export const getCountDevice = () => async (dispatch) => {
  try {
    
    const { data } = await api.getCountDevice();

    dispatch({ type: 'DEVICE_COUNT', payload: data });

  } catch (error) {
    console.log(error.response);
  }
};

export const updateDevice = (form) => async (dispatch) => {
  try {
    
    const { data } = await api.updateDevice(form);

    dispatch({ type: 'UPDATE_DEVICE', payload: data });

  } catch (error) {
    console.log(error.response);
  }
};

export const deleteDevice = (id) => async (dispatch) => {
  try {
    
    await api.deleteDevice(id);

    dispatch({ type: 'DELETE_DEVICE', payload: id });

  } catch (error) {
    console.log(error.response);
    alert(error.response.data.message);
  }
};
  
export const getTrafficlightName = () => async (dispatch) => {
  try {
    
    const { data } = await api.getTrafficlightName();

    dispatch({ type: 'ADMIN_NAME_TRAFFIC_LIGHT', payload: data });

  } catch (error) {
    console.log(error.response);
  }
};

export const getDHT11Name = () => async (dispatch) => {
  try {
    
    const { data } = await api.getDHT11Name();

    dispatch({ type: 'ADMIN_NAME_DHT11', payload: data });

  } catch (error) {
    console.log(error.response);
  }
};

export const getLightName = () => async (dispatch) => {
  try {
    
    const { data } = await api.getLightName();

    dispatch({ type: 'ADMIN_NAME_LIGHT', payload: data });

  } catch (error) {
    console.log(error.response);
  }
};