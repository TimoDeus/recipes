import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import Header from '../header/Header'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'redux'
import * as PropTypes from 'prop-types'
import { addRecipe } from '../../actions/recipes'
import { Redirect } from 'react-router'

class CreateRecipeForm extends Component {

  render () {
    const { handleSubmit, submitting, submitSucceeded } = this.props

    return submitSucceeded ?
      <Redirect push to="/"/>
      : (
        <Container>
          <Header showSearch={false}/>
          <form onSubmit={handleSubmit}>
            <Field name="title" label="Titel" component={renderField} type="text"/>
            <Field name="shortDescription" label="Kurzbeschreibung" component={renderField} type="text"/>
            <Field name="labels" label="Labels" component={renderField} type="text"/>
            <Field name="type" label="Kategorie" component={renderField} type="text"/>
            <button type="submit" disabled={submitting}>Submit</button>
          </form>
        </Container>
      )
  }
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && (error && <span>{error}</span>)}
    </div>
  </div>
)

const validate = values => {
  const errors = {}
  const fields = ['title', 'shortDescription', 'labels']

  fields.forEach(it =>
    errors[it] = values[it] ? undefined : 'Pflichtfeld'
  )

  return errors
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch(addRecipe(data))
})

const mapStateToProps = ({ recipeToEdit }) => ({
  initialValues: recipeToEdit
})

CreateRecipeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'create', validate })
)(CreateRecipeForm)
