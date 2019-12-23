import React, { Component } from 'react'
import { Button, Container, Form } from 'semantic-ui-react'
import Header from '../header/Header'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { compose } from 'redux'
import * as PropTypes from 'prop-types'
import { addRecipe } from '../../actions/recipes'
import { Redirect } from 'react-router'
import TextField from './elements/TextField'
import LabelSelector from './elements/LabelSelector'
import { addLabel, getLabels } from '../../actions/labels'

class CreateRecipeForm extends Component {

  componentDidMount () {
    this.props.getLabels()
  }

  render () {
    const { handleSubmit, submitting, submitSucceeded, labels, addLabel } = this.props

    return submitSucceeded ?
      <Redirect push to="/"/>
      : (
        <Container>
          <Header showSearch={false}/>
          <Form onSubmit={handleSubmit}>
            <TextField name="title" label="Titel"/>
            <TextField name="shortDescription" label="Kurzbeschreibung"/>
            <LabelSelector name="labels" label="Labels" labels={labels} onAddLabel={addLabel}/>
            {/*<Field name="labels" label="Labels" component={renderField} type="text"/>*/}
            {/*<Field name="type" label="Kategorie" component={renderField} type="text"/>*/}
            <Button type='submit' disabled={submitting}>Submit</Button>
          </Form>
        </Container>
      )
  }
}

const validate = values => {
  const errors = {}
  const fields = ['title', 'shortDescription', 'labels']

  fields.forEach(it =>
    errors[it] = values[it] ? undefined : 'Pflichtfeld'
  )

  return errors
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch(addRecipe(data)),
  getLabels: () => dispatch(getLabels()),
  addLabel: label => dispatch(addLabel(label)),
})

const mapStateToProps = ({ recipeToEdit, labels }) => ({
  initialValues: recipeToEdit,
  labels
})

CreateRecipeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  getLabels: PropTypes.func.isRequired,
  addLabel: PropTypes.func.isRequired,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'create', validate })
)(CreateRecipeForm)
