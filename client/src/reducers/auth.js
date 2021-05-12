// import * as actionType from '../constants/actionTypes'
import { TOKEN_NAME } from '@environments'

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem(TOKEN_NAME, JSON.stringify({ ...action?.data }))
      return { ...state, authData: action.data, loading: false, errors: null }
    case "LOGOUT":
      //localStorage.clear()
      return { ...state, authData: null, loading: false, errors: null }
    default:
      return state
  }
}

export default authReducer
