import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteRecipe, fetchRecipes } from '../../actions/recipes'
import { getQueryParamsFromLocation, stringifyQueryParams } from '../../utils/queryString'
import Grid from '@material-ui/core/Grid'
import RecipeCard from './RecipeCard'

class RecipeCardContainer extends Component {

  tagClickHandler = value => () => {
    const { history, location } = this.props
    const queryParams = getQueryParamsFromLocation(location)
    let { tags = [] } = queryParams
    if (!Array.isArray(tags)) {
      tags = [tags]
    }
    if (!tags.includes(value)) {
      tags.push(value)
    } else {
      tags = tags.filter(t => t !== value)
    }
    queryParams.tags = tags
    history.push(`${location.pathname}?${stringifyQueryParams(queryParams)}`)
    this.props.onTagClicked(queryParams)
  }

  render () {
    const { recipe, auth, onDelete } = this.props
    const isAuthenticated = Boolean(auth.token)
    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <RecipeCard recipe={recipe} isAuthenticated={isAuthenticated} onTagClicked={this.tagClickHandler}
                    onDelete={onDelete}/>
      </Grid>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  onTagClicked: params => dispatch(fetchRecipes(params)),
  onDelete: recipeId => dispatch(deleteRecipe(recipeId)),
})

const mapStateToProps = ({ auth }) => ({
  auth
})

RecipeCardContainer.propTypes = {
  recipe: PropTypes.object.isRequired,
  onTagClicked: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeCardContainer))
