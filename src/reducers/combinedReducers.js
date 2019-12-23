import { combineReducers } from 'redux'
import recipes from './recipes'
import filter from './filter'
import user from './user'
import labels from './labels'
import { reducer as formReducer } from 'redux-form'

const combinedReducers = combineReducers({
  recipes,
  filter,
  labels,
  user,
  form: formReducer
})

export default combinedReducers
