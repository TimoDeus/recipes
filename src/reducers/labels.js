import { ADD_LABEL, FETCH_LABELS } from '../actions/actionTypes'
import 'core-js'

const initialState = []

const labels = (state = initialState, action) => {
  if (action.type === FETCH_LABELS) {
    return [...initialState, ...action.data]
  } else if (action.type === ADD_LABEL) {
    return [...state, action.data]
  } else {
    return state
  }
}

export default labels
