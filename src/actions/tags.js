import axios from 'axios'
import { ADD_TAG, FETCH_TAGS } from './actionTypes'

const doGetTags = () => dispatch => {
  return axios.get(process.env.REACT_APP_API_BASE_URL + 'recipes/getTags').then(
    ({data}) => dispatch({
      type: FETCH_TAGS,
      data
    }))
}

export const getTags = () => dispatch => dispatch(doGetTags())

export const addTag = tag => dispatch => dispatch({
  type: ADD_TAG,
  data: tag
})
