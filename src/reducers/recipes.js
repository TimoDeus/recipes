import { DELETE_RECIPE, FETCH_RECIPES, FILTER_BY_TAGS } from '../actions/actionTypes'

const initialState = {}

const recipes = (state = initialState, action) => {
  if (action.type === FETCH_RECIPES) {
    return { ...state, ...action.data }
  } else if (action.type === FILTER_BY_TAGS) {
    return { ...state, ...action.data }
  } else if (action.type === DELETE_RECIPE) {
    return filterById(state, action.data.recipeId)
  } else {
    return state
  }
}

const filterById = (state, id) => {
  return Object.keys(state).reduce((res, type) => {
    res[type] = state[type].filter(recipe => recipe._id !== id)
    return res
  }, {})
}

export default recipes
