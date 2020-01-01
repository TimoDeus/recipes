import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PropTypes from 'prop-types'
import RecipeForm from './RecipeForm'
import { editRecipe, fetchRecipe } from '../../actions/recipes'

class EditRecipeForm extends Component {

  componentDidMount () {
    const recipeId = this.props.match.params.recipeId
    this.props.getRecipe(recipeId)
  }

  render () {
    const { onSubmit } = this.props
    return <RecipeForm onSubmit={onSubmit} formId="edit"/>
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch(editRecipe(data)),
  getRecipe: recipeId => dispatch(fetchRecipe(recipeId))
})

EditRecipeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  getRecipe: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(EditRecipeForm)
