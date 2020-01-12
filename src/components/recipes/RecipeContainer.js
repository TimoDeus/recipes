import React from 'react'
import { connect } from 'react-redux'
import * as PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { deleteRecipe, fetchRecipeByTitle, fetchRecipes } from '../../actions/recipes'
import Recipe from './Recipe'

class RecipeContainer extends React.Component {

  componentDidMount () {
    this.props.getRecipe()
  }

  render () {
    const { recipe, isAuthenticated, onDelete, onTagClicked } = this.props
    console.log('recipe', recipe)
    return Object.keys(recipe).length && <Recipe recipe={recipe} isAusthenticated={isAuthenticated} onDelete={onDelete} onTagClicked={onTagClicked}/>
  }
}

const mapDispatchToProps = (dispatch, { match }) => ({
  getRecipe: () => dispatch(fetchRecipeByTitle(match.params.title)),
  onDelete: recipeId => dispatch(deleteRecipe(recipeId)),
  onTagClicked: params => dispatch(fetchRecipes(params)),
})

const mapStateToProps = ({ recipe, auth: { username } }) => ({
  recipe,
  isAuthenticated: Boolean(username)
})

RecipeContainer.propTypes = {
  getRecipe: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onTagClicked: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeContainer))
