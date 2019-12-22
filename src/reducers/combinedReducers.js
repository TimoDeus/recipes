import {combineReducers} from 'redux';
import recipes from './recipes';
import filter from './filter';
import user from './user';
import { reducer as formReducer } from 'redux-form'

const combinedReducers = combineReducers({
	recipes,
	filter,
  user,
  form: formReducer
});

export default combinedReducers;
