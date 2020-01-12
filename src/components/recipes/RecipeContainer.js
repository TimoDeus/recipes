import React from 'react'
import { connect } from 'react-redux'
import * as PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { fetchRecipeByTitle, fetchRecipes, resetRecipe } from '../../actions/recipes'
import Recipe from './Recipe'
import { isNonEmptyObject } from '../../utils/utils'
import NotFound from '../NotFoundPage'

class RecipeContainer extends React.Component {

  componentDidMount () {
    this.props.getRecipe()
  }

  render () {
    const { recipe, isAuthenticated, onTagClicked, fetchError } = this.props
    if (fetchError) {
      return <NotFound/>
    } else if (isNonEmptyObject(recipe)) {
      return <Recipe recipe={recipe} isAuthenticated={isAuthenticated} onTagClicked={onTagClicked}/>
    } else {
      return null
    }
  }
}

const mapDispatchToProps = (dispatch, { match }) => ({
  getRecipe: () => dispatch(fetchRecipeByTitle(match.params.title)),
  resetRecipe: () => dispatch(resetRecipe()),
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
  onTagClicked: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeContainer))
