import { FETCH_RECIPIES } from '../actions/actionTypes'
import 'core-js'

const initialState = {}

const recipes = (state = initialState, action) => {
  if (action.type === FETCH_RECIPIES) { return { ...state, ...action.data } } else { return state }
}

export default recipes
