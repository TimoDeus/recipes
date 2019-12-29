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
    const { recipes } = this.props
    return (
      <Container>
        <Header/>
        <SubHeader/>
        <Grid stackable columns={2}>
          {recipes && recipes.map(recipe =>
            <RecipeCard key={recipe.title} recipe={recipe}/>
          )}
        </Grid>
      </Container>
    )
  }
}

const filterByTag = (recipes, selectedTags) =>
  recipes ? recipes.filter(recipe => selectedTags.every(tag => recipe.tags.includes(tag))) : []

const filterByFreetext = (recipes, value) => {
  if (!recipes) return []
  const freetext = value.trim().toUpperCase()
  return recipes.filter(e =>
    e.title.toUpperCase().match(freetext) ||
    e.shortDescription.toUpperCase().match(freetext) ||
    e.tags.some(tag => tag.toUpperCase().match(freetext))
  )
}

const applyFilter = (allRecipes, filter) => {
  const byType = allRecipes ? allRecipes[filter.type] : []
  if (filter.tags.length) {
    return filterByTag(byType, filter.tags)
  } else if (filter.freetext && filter.freetext.length > 2) {
    return filterByFreetext(byType, filter.freetext)
  } else {
    return byType
  }
}

const mapDispatchToProps = dispatch => ({
  fetchRecipes: () => dispatch(fetchRecipes())
})

const mapStateToProps = ({ recipes, filter }) => ({
  recipes: applyFilter(recipes, filter) || [],
  filter
})

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
  filter: PropTypes.object.isRequired,
  fetchRecipes: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)
