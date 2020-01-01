import { ADD_RECIPE, DELETE_RECIPE, EDIT_RECIPE, FETCH_RECIPE, FETCH_RECIPES } from './actionTypes'
import axios from 'axios'

const reduceDbResult = ({ data }) => data.reduce((res, cur) => {
  res[cur._id] = cur.recipes
  return res
}, {})

const loadAllRecipes = () => {
  return axios.get(process.env.REACT_APP_API_BASE_URL + 'recipes')
    .then(reduceDbResult)
}

export const fetchRecipes = () => dispatch => {
  return loadAllRecipes().then(
    res => dispatch({
      type: FETCH_RECIPES,
      data: res
    }))
}

const doAddRecipe = data => (dispatch, getState) => {
  return axios.post(process.env.REACT_APP_API_BASE_URL + 'recipes/addRecipe', data, createRequestConfig(getState())).then(
    res => dispatch({
      type: ADD_RECIPE,
      data: res
    }))
}

const doEditRecipe = (recipeId, data) => (dispatch, getState) => {
  return axios.patch(process.env.REACT_APP_API_BASE_URL + 'recipes/editRecipe', data, createRequestConfig(getState())).then(
    () => dispatch({
      type: EDIT_RECIPE,
      data: { ...data, ...{ _id: recipeId } }
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

export const addRecipe = data => dispatch => dispatch(doAddRecipe(data))

export const deleteRecipe = recipeId => dispatch => dispatch(doDeleteRecipe(recipeId))

export const editRecipe = (recipeId, data) => dispatch => dispatch(doEditRecipe(recipeId, data))

const loadRecipe = recipeId => axios.get(process.env.REACT_APP_API_BASE_URL + 'recipes/getRecipeById', { params: { recipeId } })

export const fetchRecipe = recipeId => dispatch =>
  loadRecipe(recipeId).then(
    ({ data }) => dispatch({
      type: FETCH_RECIPE,
      data
    }))
