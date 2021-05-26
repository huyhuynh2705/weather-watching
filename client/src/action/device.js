import * as api from '../api/index'

export const addDevice = (form) => async (dispatch) => {
  try {
    const { data } = await api.addDevice(form)

    dispatch({ type: "ADD_DEVICE", data })
    
  } catch (error) {
    alert(error.response.data.message)
  }
}

export const addDeviceSet = (form) => async (dispatch) => {
    try {
      const { data } = await api.addDeviceSet(form)
  
      dispatch({ type: "ADDDEVICESET", data })
      
    } catch (error) {
      alert(error.response.data.message)
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
    console.log(error);
  }
};

export const updateDevice = (form) => async (dispatch) => {
  try {
    
    const { data } = await api.updateDevice(form);

    dispatch({ type: 'UPDATE_DEVICE', payload: data });

  } catch (error) {
    console.log(error);
  }
};

export const deleteDevice = (id) => async (dispatch) => {
  try {
    
    await api.deleteDevice(id);

    const { data } = await api.getCountDevice();
    
    dispatch({ type: 'DEVICE_COUNT', payload: data });
    
    dispatch({ type: 'DELETE_DEVICE', payload: id });

  } catch (error) {
    console.log(error);
  }
};
  