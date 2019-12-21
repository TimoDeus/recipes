import { FETCH_RECIPIES } from './actionTypes'
import data from '../data/output.json'

const loadFromFile = () => Promise.resolve({ data })

const groupByType = array =>
  array.reduce(
    (objectsByKeyValue, obj) => ({
      ...objectsByKeyValue,
      [obj.type]: (objectsByKeyValue[obj.type] || []).concat(obj)
    }),
    {}
  )

const fetchRecipes = () => dispatch => {
  return loadFromFile().then(
    res => dispatch({
      type: FETCH_RECIPIES,
      data: groupByType(res.data)
    }))
}

const shouldFetchRecipes = ({ recipes }) => !recipes || !Object.keys(recipes).length

export const fetchRecipesIfNeeded = () => (dispatch, getState) =>
  shouldFetchRecipes(getState()) ? dispatch(fetchRecipes()) : Promise.resolve()
