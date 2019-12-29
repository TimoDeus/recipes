import { FILTER_BY_FREETEXT, FILTER_BY_TAG, FILTER_BY_TYPE, RESET_FILTER } from './actionTypes'

export const filterByTag = data => dispatch => dispatch({type: FILTER_BY_TAG, data});
export const filterByType = data => dispatch => dispatch({type: FILTER_BY_TYPE, data});
export const filterByFreetext = data => dispatch => dispatch({type: FILTER_BY_FREETEXT, data});
export const resetFilter = () => dispatch => dispatch({type: RESET_FILTER});
