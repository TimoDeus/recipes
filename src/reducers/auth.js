import { LOGIN, LOGOUT } from '../actions/actionTypes'

const initialState = {
  token: undefined,
  username: undefined
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, token: action.data.token, username: action.data.name }
    case LOGOUT:
      return { ...initialState }
    default:
      return state
  }
}

export default auth
