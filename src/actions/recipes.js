import { FETCH_RECIPIES } from './actionTypes'
import axios from 'axios'

const reduceDbResult = ({ data }) => data.reduce((res, cur) => {
  res[cur._id] = cur.recipes
  return res
}, {})

const loadAllRecipes = () => {
  return axios.get(process.env.REACT_APP_API_BASE_URL + 'recipes')
    .then(reduceDbResult)
}

const fetchRecipes = () => dispatch => {
  return loadAllRecipes().then(
    res => dispatch({
      type: FETCH_RECIPIES,
      data: res
    }))
}

const shouldFetchRecipes = ({ recipes }) => !recipes || !Object.keys(recipes).length

export const fetchRecipesIfNeeded = () => (dispatch, getState) =>
  shouldFetchRecipes(getState()) ? dispatch(fetchRecipes()) : Promise.resolve()
