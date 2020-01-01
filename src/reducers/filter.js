import { ADD_TO_TAGS, FILTER_BY_TYPE, REMOVE_FROM_TAGS, RESET_FILTER, SET_QUERY } from '../actions/actionTypes'
import { TYPE_MAIN } from '../utils/constants'

const initialState = {
  tags: [],
  type: TYPE_MAIN,
  query: undefined
}

const filter = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_BY_TYPE:
      return { ...state, type: action.data }
    case ADD_TO_TAGS: {
      const tags = state.tags.includes(action.data) ? [...state.tags] : [...state.tags, action.data]
      return { ...state, ...{ tags } }
    }
    case REMOVE_FROM_TAGS: {
      const tags = state.tags.filter(f => f !== action.data)
      return { ...state, ...{ tags } }
    }
    case SET_QUERY:
      return { ...state, query: action.data }
    case RESET_FILTER:
      return { ...initialState, ...{ type: state.type } }
    default:
      return state
  }
}

export default filter
