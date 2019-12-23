import axios from 'axios'
import { ADD_LABEL, FETCH_LABELS } from './actionTypes'

const doGetLabels = () => dispatch => {
  return axios.get(process.env.REACT_APP_API_BASE_URL + 'recipes/getLabels').then(
    ({data}) => dispatch({
      type: FETCH_LABELS,
      data
    }))
}

export const getLabels = () => dispatch => dispatch(doGetLabels())

export const addLabel = label => dispatch => dispatch({
  type: ADD_LABEL,
  data: label
})
