import { combineReducers } from 'redux'
import recipes from './recipes'
import filter from './filter'
import auth from './auth'
import tags from './tags'
import { reducer as formReducer } from 'redux-form'

const combinedReducers = combineReducers({
  recipes,
  filter,
  tags,
  auth,
  form: formReducer
})

export default combinedReducers
