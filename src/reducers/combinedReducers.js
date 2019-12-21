import {combineReducers} from 'redux';
import recipes from './recipes';
import filter from './filter';
import user from './user';

const combinedReducers = combineReducers({
	recipes,
	filter,
  user
});

export default combinedReducers;
