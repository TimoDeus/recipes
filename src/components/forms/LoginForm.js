import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { compose } from 'redux'
import * as PropTypes from 'prop-types'
import TextField from './elements/TextField'
import { login } from '../../actions/auth'

class LoginForm extends Component {

  render () {
    const { handleSubmit, submitting } = this.props

    return (
      <Form onSubmit={handleSubmit} forceUnregisterOnUnmount={true}>
        <TextField name="name" label="Benutzername"/>
        <TextField type='password' name="password" label="Passwort"/>
        <Button type='submit' disabled={submitting}>Submit</Button>
      </Form>
    )
  }
}

const validate = values => {
  const errors = {}
  const fields = ['name', 'password']

  fields.forEach(it =>
    errors[it] = values[it] ? undefined : 'Pflichtfeld'
  )

  return errors
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch(login(data))
})

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default compose(
  connect(null, mapDispatchToProps),
  reduxForm({ form: 'login', validate })
)(LoginForm)
