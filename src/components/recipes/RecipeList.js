import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import RecipeCard from './RecipeCard'
import { connect } from 'react-redux'
import { fetchRecipes } from '../../actions/recipes'
import * as PropTypes from 'prop-types'
import SubHeader from '../header/SubHeader'
import { withRouter } from 'react-router-dom'
import { TYPE_MAIN } from '../../utils/constants'
import { getQueryParamsFromLocation, stringifyQueryParams } from '../../utils/queryString'
import SelectedTags from '../header/SelectedTags'

class RecipeList extends Component {

  componentDidMount () {
    this.props.fetchRecipes()
  }

  getActiveTab = () => {
    const { location } = this.props
    return getQueryParamsFromLocation(location).type || TYPE_MAIN
  }

  onDeleteTag = value => () => {
    const { history, location } = this.props
    const queryParams = getQueryParamsFromLocation(location)
    let { tags = [] } = queryParams
    if (!Array.isArray(tags)) {
      tags = [tags]
    }
    queryParams.tags = tags.filter(t => t !== value)
    history.push(`${location.pathname}?${stringifyQueryParams(queryParams)}`)
    this.props.onTagClicked(queryParams)
  }

  render () {
    const { recipes, location } = this.props
    const toDisplay = recipes[this.getActiveTab()] || []
    const { tags } = getQueryParamsFromLocation(location)
    return (
      <div>
        <SubHeader/>
        <SelectedTags tags={tags} onDeleteTag={this.onDeleteTag}/>
        <Grid stackable columns={2}>
          {toDisplay.map(recipe =>
            <RecipeCard key={recipe.title} recipe={recipe}/>
          )}
        </Grid>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, { location }) => ({
  fetchRecipes: () => dispatch(fetchRecipes(getQueryParamsFromLocation(location))),
  onTagClicked: params => dispatch(fetchRecipes(params)),
})

const mapStateToProps = ({ recipes }) => ({
  recipes
})

RecipeList.propTypes = {
  recipes: PropTypes.object.isRequired,
  fetchRecipes: PropTypes.func.isRequired,
  onDeleteTag: PropTypes.func.isRequired,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeList))
