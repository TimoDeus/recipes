import { FILTER_BY_FREETEXT, FILTER_BY_LABEL, FILTER_BY_TYPE, RESET_FILTER } from '../actions/actionTypes'
import { TYPE_MAIN } from '../utils/constants'

const initialState = {
  labels: [],
  type: TYPE_MAIN,
  freetext: undefined
}

const filter = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_BY_TYPE:
      return { ...state, ...initialState, type: action.data }
    case FILTER_BY_LABEL: {
      const labels = state.labels.includes(action.data) ? state.labels.filter(i => i !== action.data) : [...state.labels, action.data]
      return { ...state, ...initialState, labels }
    }
    case FILTER_BY_FREETEXT:
      return { ...state, freetext: action.data }
    case RESET_FILTER:
      return { ...state, ...initialState }
    default:
      return state
  }
}

export default filter
