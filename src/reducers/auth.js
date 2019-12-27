import { LOGIN, LOGOUT } from '../actions/actionTypes'

const initialState = {
  token: undefined
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, token: action.data }
    case LOGOUT:
      return { ...initialState }
    default:
      return state
  }
}

export default auth
