import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PropTypes from 'prop-types'
import { addRecipe } from '../../actions/recipes'
import RecipeForm from './RecipeForm'

class CreateRecipeForm extends Component {

  render () {
    const { onSubmit } = this.props
    return <RecipeForm onSubmit={onSubmit} formId="create"/>
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch(addRecipe(data))
})

CreateRecipeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(CreateRecipeForm)
