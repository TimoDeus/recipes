import { ADD_TAG, FETCH_TAGS } from '../actions/actionTypes'
import 'core-js'

const initialState = []

const tags = (state = initialState, action) => {
  if (action.type === FETCH_TAGS) {
    return [...initialState, ...action.data]
  } else if (action.type === ADD_TAG) {
    return [...state, action.data]
  } else {
    return state
  }
}

export default tags
