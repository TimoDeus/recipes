import React, { Component } from 'react'
import { Container, Grid } from 'semantic-ui-react'
import RecipeCard from './RecipeCard'
import { connect } from 'react-redux'
import { fetchRecipes } from '../../actions/recipes'
import * as PropTypes from 'prop-types'
import Header from '../header/Header'
import SubHeader from '../header/SubHeader'

class RecipeList extends Component {

  componentDidMount () {
    this.props.fetchRecipes()
  }

  render () {
    const { recipes, filter } = this.props
    const toDisplay = recipes[filter.type] || []
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

const mapStateToProps = ({ recipes, filter }) => ({
  recipes,
  filter
})

RecipeList.propTypes = {
  recipes: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
  fetchRecipes: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)
