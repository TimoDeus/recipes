import { ADD_TO_TAGS, FILTER_BY_FREETEXT, FILTER_BY_TAGS, FILTER_BY_TYPE, RESET_FILTER } from './actionTypes'
import axios from 'axios'
import { reduceDbResult } from '../utils/dbUtils'
import { fetchRecipes } from './recipes'

const getRecipesByTags = tags => axios.get(process.env.REACT_APP_API_BASE_URL + 'recipes/getRecipesByTags', { params: { tags } }).then(reduceDbResult)
const updateRecipes = tags => dispatch => getRecipesByTags(tags).then(
  data => dispatch({ type: FILTER_BY_TAGS, data })
)
const updateTags = tags => ({ type: ADD_TO_TAGS, data: tags })

export const filterByTags = tags => dispatch =>
  Promise.all([
    dispatch(updateRecipes(tags)),
    dispatch(updateTags(tags))
  ])

export const filterByType = data => dispatch => dispatch({ type: FILTER_BY_TYPE, data })
export const filterByFreetext = data => dispatch => dispatch({ type: FILTER_BY_FREETEXT, data })

export const resetFilter = () => dispatch =>
  Promise.all([
    dispatch({ type: RESET_FILTER }),
    dispatch(fetchRecipes())
  ])
