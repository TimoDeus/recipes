import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PropTypes from 'prop-types'
import { addRecipe, resetRecipe } from '../../actions/recipes'
import RecipeForm from './RecipeForm'

class CreateRecipeForm extends Component {

  componentDidMount () {
    this.props.resetCurrentRecipe()
  }

  render () {
    const { onSubmit } = this.props
    return <RecipeForm onSubmit={onSubmit} formId="create"/>
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch(addRecipe(data)),
  resetCurrentRecipe: () => dispatch(resetRecipe())
})

CreateRecipeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  resetCurrentRecipe: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(CreateRecipeForm)
