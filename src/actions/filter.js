import { ADD_TO_TAGS, FILTER_BY_QUERY, FILTER_BY_TAGS, FILTER_BY_TYPE, RESET_FILTER, SET_QUERY } from './actionTypes'
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

export const filterByType = data => dispatch => dispatch({ type: FILTER_BY_TYPE, data })

const getRecipesByQuery = query => dispatch =>
  axios.get(process.env.REACT_APP_API_BASE_URL + 'recipes/getRecipesByQuery', { params: { query } })
    .then(({ data }) => dispatch({ type: FILTER_BY_QUERY, data }))

const updateQuery = query => ({ type: SET_QUERY, data: query })

export const filterByQuery = query => dispatch =>
  Promise.all([
    dispatch(getRecipesByQuery(query)),
    dispatch(updateQuery(query))
  ])

export const resetFilter = () => dispatch =>
  Promise.all([
    dispatch({ type: RESET_FILTER }),
    dispatch(fetchRecipes())
  ])
