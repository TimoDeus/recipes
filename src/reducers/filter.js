import { ADD_TO_TAGS, FILTER_BY_FREETEXT, FILTER_BY_TYPE, REMOVE_FROM_TAGS, RESET_FILTER } from '../actions/actionTypes'
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
    case ADD_TO_TAGS: {
      const tags = state.tags.includes(action.data) ? [...state.tags] : [...state.tags, action.data]
      return { ...state, ...{ tags } }
    }
    case REMOVE_FROM_TAGS: {
      const tags = state.tags.filter(f => f !== action.data)
      return { ...state, ...{ tags } }
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
