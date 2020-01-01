import { FETCH_RECIPE } from '../actions/actionTypes'

const initialState = {}

const recipe = (state = initialState, action) => {
  if (action.type === FETCH_RECIPE) {
    return { ...action.data }
  } else {
    return state
  }
}

export default recipe
