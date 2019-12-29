import { FILTER_BY_FREETEXT, FILTER_BY_TAG, FILTER_BY_TYPE, RESET_FILTER } from '../actions/actionTypes'
import { TYPE_MAIN } from '../utils/constants'

const initialState = {
  tags: [],
  type: TYPE_MAIN,
  freetext: undefined
}

const filter = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_BY_TYPE:
      return { ...state, ...initialState, type: action.data }
    case FILTER_BY_TAG: {
      const tags = state.tags.includes(action.data) ? state.tags.filter(i => i !== action.data) : [...state.tags, action.data]
      return { ...state, ...initialState, tags }
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
