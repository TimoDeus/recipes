import { FETCH_RECIPE, FETCH_RECIPE_BY_TITLE, RESET_RECIPE } from '../actions/actionTypes'

const initialState = {}

const recipe = (state = initialState, action) => {
  if (action.type === FETCH_RECIPE) {
    return { ...action.data }
  } else if (action.type === FETCH_RECIPE_BY_TITLE) {
    return { ...action.data }
  } else if (action.type === RESET_RECIPE) {
    return {...initialState}
  } else {
    return state
  }
}

export default recipe
