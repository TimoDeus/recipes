import React from 'react'
import { Form } from 'semantic-ui-react'
import { Field } from 'redux-form'

const TextField = ({ name, label }) =>
  <Field name={name} label={label} component={renderTextField}/>

const renderTextField = ({ label, input, meta: { touched, invalid, error }, ...custom }) =>
  <Form.Input
    label={label}
    placeholder={label}
    error={touched && invalid && error && { content: error }}
    {...input}
    {...custom}
  />

export default TextField
