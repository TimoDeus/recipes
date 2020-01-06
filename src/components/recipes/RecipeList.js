import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import RecipeCard from './RecipeCard'
import { connect } from 'react-redux'
import { fetchRecipes } from '../../actions/recipes'
import * as PropTypes from 'prop-types'
import SubHeader from '../header/SubHeader'
import { withRouter } from 'react-router-dom'
import { TYPE_MAIN } from '../../utils/constants'
import { getQueryParamsFromLocation } from '../../utils/queryString'

class RecipeList extends Component {

  componentDidMount () {
    this.props.fetchRecipes()
  }

  getActiveTab = () => {
    const { location } = this.props
    return getQueryParamsFromLocation(location).type || TYPE_MAIN
  }

  render () {
    const { recipes } = this.props
    const toDisplay = recipes[this.getActiveTab()] || []
    return (
      <div>
        <SubHeader/>
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
  fetchRecipes: () => dispatch(fetchRecipes(getQueryParamsFromLocation(location)))
})

const mapStateToProps = ({ recipes }) => ({
  recipes
})

RecipeList.propTypes = {
  recipes: PropTypes.object.isRequired,
  fetchRecipes: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeList))
