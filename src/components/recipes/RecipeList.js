import React, { Component } from 'react'
import { Container, Grid } from 'semantic-ui-react'
import RecipeCard from './RecipeCard'
import { connect } from 'react-redux'
import { fetchRecipes } from '../../actions/recipes'
import * as PropTypes from 'prop-types'
import Header from '../header/Header'
import SubHeader from '../header/SubHeader'
import { withRouter } from 'react-router-dom'
import { TYPE_MAIN } from '../../utils/constants'
import qs from 'qs'

class RecipeList extends Component {

  componentDidMount () {
    this.props.fetchRecipes()
  }

  getActiveTab = () => {
    const { location: { search } } = this.props
    return qs.parse(search.substr(1)).type || TYPE_MAIN
  }

  render () {
    const { recipes } = this.props
    const toDisplay = recipes[this.getActiveTab()] || []
    return (
      <Container>
        <Header/>
        <SubHeader/>
        <Grid stackable columns={2}>
          {toDisplay.map(recipe =>
            <RecipeCard key={recipe.title} recipe={recipe}/>
          )}
        </Grid>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchRecipes: () => dispatch(fetchRecipes())
})

const mapStateToProps = ({ recipes }) => ({
  recipes
})

RecipeList.propTypes = {
  recipes: PropTypes.object.isRequired,
  fetchRecipes: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeList))
