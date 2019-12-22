import React, { Component } from 'react'
import { Container, Grid } from 'semantic-ui-react'
import RecipeCard from './RecipeCard'
import { connect } from 'react-redux'
import { fetchRecipesIfNeeded } from '../../actions/recipes'
import * as PropTypes from 'prop-types'
import Header from '../header/Header'

class RecipeList extends Component {

  componentDidMount () {
    this.props.fetchRecipesIfNeeded()
  }

  render () {
    const { recipes } = this.props
    return (
      <Container>
        <Header/>
        <Grid stackable columns={2}>
          {recipes && recipes.map(recipe =>
            <RecipeCard key={recipe.title} recipe={recipe}/>
          )}
        </Grid>
      </Container>
    )
  }
}

const filterByLabel = (recipes, selectedLabels) =>
  recipes ? recipes.filter(recipe => selectedLabels.every(label => recipe.labels.includes(label))) : []

const filterByFreetext = (recipes, value) => {
  if (!recipes) return []
  const freetext = value.trim().toUpperCase()
  return recipes.filter(e =>
    e.title.toUpperCase().match(freetext) ||
    e.shortDescription.toUpperCase().match(freetext) ||
    e.labels.some(label => label.toUpperCase().match(freetext))
  )
}

const applyFilter = (allRecipes, filter) => {
  const byType = allRecipes ? allRecipes[filter.type] : []
  if (filter.labels.length) {
    return filterByLabel(byType, filter.labels)
  } else if (filter.freetext && filter.freetext.length > 2) {
    return filterByFreetext(byType, filter.freetext)
  } else {
    return byType
  }
}

const mapDispatchToProps = dispatch => ({
  fetchRecipesIfNeeded: () => dispatch(fetchRecipesIfNeeded())
})

const mapStateToProps = ({ recipes, filter }) => ({
  recipes: applyFilter(recipes, filter) || [],
  filter
})

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
  filter: PropTypes.object.isRequired,
  fetchRecipesIfNeeded: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)
