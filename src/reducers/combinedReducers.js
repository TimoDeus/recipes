import { combineReducers } from 'redux'
import recipes from './recipes'
import filter from './filter'
import auth from './auth'
import labels from './labels'
import { reducer as formReducer } from 'redux-form'

const combinedReducers = combineReducers({
  recipes,
  filter,
  labels,
  auth,
  form: formReducer
})

export default combinedReducers
