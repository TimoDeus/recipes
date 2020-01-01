import { ADD_TO_TAGS, REMOVE_FROM_TAGS, RESET_FILTER, SET_QUERY } from '../actions/actionTypes'

const initialState = {
  tags: [],
  query: undefined
}

const filter = (state = initialState, action) => {
  switch (action.type) {
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
      return { ...initialState }
    default:
      return state
  }
}

export default filter
