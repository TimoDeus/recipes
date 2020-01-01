import { DELETE_RECIPE, FETCH_RECIPES, FILTER_BY_QUERY, FILTER_BY_TAGS } from '../actions/actionTypes'
import { TYPE_DESSERT, TYPE_MAIN, TYPE_PASTRIES } from '../utils/constants'

const initialState = {
  [TYPE_MAIN]: [],
  [TYPE_DESSERT]: [],
  [TYPE_PASTRIES]: []
}

const recipes = (state = initialState, action) => {
  if (action.type === FETCH_RECIPES) {
    return { ...state, ...reduceDbResult(action) }
  } else if (action.type === FILTER_BY_TAGS) {
    return { ...state, ...reduceDbResult(action) }
  } else if (action.type === FILTER_BY_QUERY) {
    return { ...state, ...reduceDbResult(action) }
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

const reduceDbResult = ({ data }) => data.reduce((res, cur) => {
  res[cur._id] = cur.recipes
  return res
}, {...initialState})

export default recipes
