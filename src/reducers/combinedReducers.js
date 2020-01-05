import { combineReducers } from 'redux'
import recipes from './recipes'
import recipe from './recipe'
import auth from './auth'
import tags from './tags'
import { reducer as formReducer } from 'redux-form'

const combinedReducers = combineReducers({
  recipes,
  recipe,
  tags,
  auth,
  form: formReducer
})

export default combinedReducers
