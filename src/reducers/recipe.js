import { FETCH_ERROR, FETCH_RECIPE, FETCH_RECIPE_BY_TITLE, RESET_RECIPE } from '../actions/actionTypes'

const initialState = {
  fetchError: false,
  recipe: undefined
}

const recipe = (state = initialState, action) => {
  if (action.type === FETCH_RECIPE || action.type === FETCH_RECIPE_BY_TITLE) {
    return { ...state, ...{ fetchError: false, recipe: action.data } }
  } else if (action.type === FETCH_ERROR) {
    return { ...state, ...{ fetchError: true, recipe: undefined } }
  } else if (action.type === RESET_RECIPE) {
    return { ...initialState }
  } else {
    return state
  }
}

export default recipe
