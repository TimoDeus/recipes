import { ADD_RECIPES, FETCH_RECIPES } from './actionTypes'
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

const doAddRecipe = data => dispatch => {
  // TODO add input field for this!
  data.type = "MAIN"
  return axios.post(process.env.REACT_APP_API_BASE_URL + 'recipes/addRecipe', data).then(
    res => dispatch({
      type: ADD_RECIPES,
      data: res
    }))
}

export const addRecipe = data => dispatch => dispatch(doAddRecipe(data))
