import { FETCH_RECIPE, RESET_RECIPE } from '../actions/actionTypes'

const initialState = {}

const recipe = (state = initialState, action) => {
  if (action.type === FETCH_RECIPE) {
    return { ...action.data }
  } else if (action.type === RESET_RECIPE) {
    return {...initialState}
  } else {
    return state
  }
}

export default recipe
