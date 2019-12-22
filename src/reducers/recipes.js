import { FETCH_RECIPES } from '../actions/actionTypes'
import 'core-js'

const initialState = {}

const recipes = (state = initialState, action) => {
  if (action.type === FETCH_RECIPES) { return { ...state, ...action.data } } else { return state }
}

export default recipes
