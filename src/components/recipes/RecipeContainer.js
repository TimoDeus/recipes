import React from 'react'
import { connect } from 'react-redux'
import * as PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { deleteRecipe, fetchRecipeByTitle, fetchRecipes, resetRecipe } from '../../actions/recipes'
import Recipe from './Recipe'
import { isNonEmptyObject } from '../../utils/utils'
import NotFound from '../NotFoundPage'

class RecipeContainer extends React.Component {

  componentDidMount () {
    this.props.getRecipe()
  }

  componentWillUnmount () {
    this.props.resetRecipe()
  }

  render () {
    const { recipe, isAuthenticated, onDelete, onTagClicked, fetchError } = this.props
    if (fetchError) {
      return <NotFound/>
    } else if (isNonEmptyObject(recipe)) {
      return <Recipe recipe={recipe} isAusthenticated={isAuthenticated} onDelete={onDelete}
                     onTagClicked={onTagClicked}/>
    } else {
      return null
    }
  }
}

const mapDispatchToProps = (dispatch, { match }) => ({
  getRecipe: () => dispatch(fetchRecipeByTitle(match.params.title)),
  resetRecipe: () => dispatch(resetRecipe()),
  onDelete: recipeId => dispatch(deleteRecipe(recipeId)),
  onTagClicked: params => dispatch(fetchRecipes(params)),
})

const mapStateToProps = ({ recipe: { fetchError, recipe }, auth: { username } }) => ({
  recipe,
  fetchError,
  isAuthenticated: Boolean(username)
})

RecipeContainer.propTypes = {
  getRecipe: PropTypes.func.isRequired,
  resetRecipe: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onTagClicked: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeContainer))
