import * as api from '../api/index'

// export const addDeviceSet = (form) => async (dispatch) => {
//     try {
//       const { data } = await api.addDeviceSet(form)
  
//       dispatch({ type: "ADDDEVICESET", data })
      
//     } catch (error) {
//       alert(error.response.data.message)
//     }
//   }
  
export const getAdminDeviceSet = (form) => async (dispatch) => {
  try {
    
    const { data } = await api.getAdminDeviceSet(form);

    dispatch({ type: 'ADMIN_DEVICE_SET', payload: data });

  } catch (error) {
    console.log(error.response);
  }
};

export const getCountDeviceSet = () => async (dispatch) => {
  try {
    
    const { data } = await api.getCountDeviceSet();

    dispatch({ type: 'DEVICE_SET_COUNT', payload: data });

  } catch (error) {
    console.log(error);
  }
};

export const getCountUnusedSet = () => async (dispatch) => {
  try {
    
    const { data } = await api.getCountUnusedSet();

    dispatch({ type: 'UNUSED_DEVICE_SET_COUNT', payload: data });

  } catch (error) {
    console.log(error);
  }
};

// export const updateDeviceSet = (form) => async (dispatch) => {
//   try {
    
//     const { data } = await api.updateDeviceSet(form);

//     dispatch({ type: 'UPDATE_DEVICE', payload: data });

//   } catch (error) {
//     console.log(error);
//   }
// };

export const deleteDeviceSet = (id) => async (dispatch) => {
  try {
    
    await api.deleteDeviceSet(id);

    const { data } = await api.getCountDeviceSet();
    
    dispatch({ type: 'DEVICE_SET_COUNT', payload: data });
    
    dispatch({ type: 'DELETE_DEVICE_SET', payload: id });

  } catch (error) {
    console.log(error);
  }
};
  
export const getNameSet = () => async (dispatch) => {
  try {
    
    const { data } = await api.getNameSet();

    dispatch({ type: 'ADMIN_NAME_DEVICE_SET', payload: data });

  } catch (error) {
    console.log(error.response);
  }
};