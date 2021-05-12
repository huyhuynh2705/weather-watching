import * as api from '../api/index'
// import { AUTH } from "../constants/actionType"


export const signIn = (form) => async (dispatch) => {
  try {
    const { data } = await api.signIn(form)

    dispatch({ type: "AUTH", data })
    
  } catch (error) {
    console.log(error.response)
  }
}


// export const signup = (formData, router) => async (dispatch) => {
//   try {
//     const { data } = await api.signUp(formData)

//     dispatch({ type: AUTH, data })

//     router.push('/')
//   } catch (error) {
//     console.log(error)
//   }
// }
