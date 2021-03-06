import * as api from '../api/index'
// import { AUTH } from "../constants/actionType"


export const signIn = (form) => async (dispatch) => {
  try {
    const { data } = await api.signIn(form)

    dispatch({ type: "AUTH", data })
    
  } catch (error) {
    console.log(error.response)
    alert(error.response.data.message)
  }
}

export const signUp = (form) => async (dispatch) => {
  try {
    
    await api.signUp(form)

  } catch (error) {
    console.log(error.response)
    alert(error.response.data.message)
  }
}

export const updateProfile = (id, form) => async (dispatch) => {
  try {
    const { data } = await api.updateProfile(id, form)

    dispatch({ type: "UPDATE", data })
    
  } catch (error) {
    console.log(error.response)
    alert(error.response.data.message)
  }
}

export const forgotPassword = (form) => async (dispatch) => {
  try {

    await api.forgotPassword(form)

  } catch (error) {
    console.log(error.response)
  }
}