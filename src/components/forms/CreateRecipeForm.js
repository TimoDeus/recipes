import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import Header from '../header/Header'
import { connect } from 'react-redux'

class CreateRecipeForm extends Component {

  render () {
    return (
      <Container>
        <Header showSearch={false}/>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  // fetchRecipesIfNeeded: () => dispatch(fetchRecipesIfNeeded())
})

const mapStateToProps = ({ recipes, filter }) => ({
  // recipes: applyFilter(recipes, filter) || [],
  // filter
})

CreateRecipeForm.propTypes = {}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecipeForm)
