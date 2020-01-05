import { ADD_TO_TAGS, FILTER_BY_TAGS, RESET_FILTER } from './actionTypes'
import axios from 'axios'
import { fetchRecipes } from './recipes'

const getRecipesByTags = tags => dispatch =>
  axios.get(process.env.REACT_APP_API_BASE_URL + 'recipes/getRecipesByTags', { params: { tags } })
    .then(({ data }) => dispatch({ type: FILTER_BY_TAGS, data }))

const updateTags = tags => ({ type: ADD_TO_TAGS, data: tags })

export const filterByTags = tags => dispatch =>
  Promise.all([
    dispatch(getRecipesByTags(tags)),
    dispatch(updateTags(tags))
  ])

export const resetFilter = () => dispatch =>
  Promise.all([
    dispatch({ type: RESET_FILTER }),
    dispatch(fetchRecipes())
  ])
