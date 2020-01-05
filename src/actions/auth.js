import axios from 'axios'
import { LOGIN, LOGOUT } from './actionTypes'

const doLogin = data => dispatch => {
  return axios.post(process.env.REACT_APP_API_BASE_URL + 'auth/login', data).then(
    ({data}) => dispatch({
      type: LOGIN,
      data: data
    }))
}

export const login = data => dispatch => dispatch(doLogin(data))

export const logout = () => dispatch => dispatch({type: LOGOUT})
