import {
  ADD_RECIPE,
  DELETE_RECIPE,
  EDIT_RECIPE,
  FETCH_ERROR,
  FETCH_RECIPE,
  FETCH_RECIPES,
  RESET_RECIPE
} from './actionTypes'
import axios from 'axios'
import { normalizeTitle } from '../utils/recipeUtils'

export const fetchRecipes = params => dispatch =>
  axios.get(process.env.REACT_APP_API_BASE_URL + 'recipes', { params }).then(
    ({ data }) => dispatch({
      type: FETCH_RECIPES,
      data
    }))

const doAddRecipe = data => (dispatch, getState) => {
  data.normalizedTitle = normalizeTitle(data.title)
  return axios.post(process.env.REACT_APP_API_BASE_URL + 'recipes/addRecipe', data, createRequestConfig(getState())).then(
    res => dispatch({
      type: ADD_RECIPE,
      data: res
    }))
}

const doEditRecipe = data => (dispatch, getState) => {
  data.normalizedTitle = normalizeTitle(data.title)
  return axios.patch(process.env.REACT_APP_API_BASE_URL + 'recipes/editRecipe', data, createRequestConfig(getState())).then(
    () => dispatch({
      type: EDIT_RECIPE,
      data: { ...data }
    })
  )
}

const doDeleteRecipe = recipeId => (dispatch, getState) => {
  return axios.delete(process.env.REACT_APP_API_BASE_URL + 'recipes/deleteRecipe', createRequestConfig(getState()), { recipeId }).then(
    ({ data }) => {
      data.recipeId = recipeId
      dispatch({
        type: DELETE_RECIPE,
        data: data
      })
    })
}

const createRequestConfig = state => ({
  headers: {
    'x-access-token': state.auth.token
  }
})

export const resetRecipe = () => dispatch => dispatch({ type: RESET_RECIPE })

export const addRecipe = data => dispatch => dispatch(doAddRecipe(data))

export const deleteRecipe = recipeId => dispatch => dispatch(doDeleteRecipe(recipeId))

export const editRecipe = data => dispatch => dispatch(doEditRecipe(data))

const loadRecipe = recipeId => axios.get(process.env.REACT_APP_API_BASE_URL + 'recipes/getRecipeById', { params: { recipeId } })

const loadRecipeByTitle = title => axios.get(process.env.REACT_APP_API_BASE_URL + 'recipes/getRecipeByTitle', { params: { title } })

export const fetchRecipe = recipeId => dispatch =>
  loadRecipe(recipeId).then(
    ({ data }) => dispatch({
      type: FETCH_RECIPE,
      data
    }),
    () => dispatch({ type: FETCH_ERROR })
  )

export const fetchRecipeByTitle = title => dispatch =>
  loadRecipeByTitle(title).then(
    ({ data }) => dispatch({
      type: FETCH_RECIPE,
      data
    }),
    () => dispatch({ type: FETCH_ERROR })
  )
