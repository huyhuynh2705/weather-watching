import * as api from '../api/index'
// import { AUTH } from "../constants/actionType"


export const addDevice = (form) => async (dispatch) => {
  try {
    const { data } = await api.addDevice(form)

    dispatch({ type: "ADDDEVICE", data })
    
  } catch (error) {
    console.log(error.response.data)
    alert(error.response.data.message)
  }
}

export const addDeviceSet = (form) => async (dispatch) => {
    try {
      const { data } = await api.addDeviceSet(form)
  
      dispatch({ type: "ADDDEVICESET", data })
      
    } catch (error) {
      console.log(error.response)
      alert(error.response.data.message)
    }
  }
  
  