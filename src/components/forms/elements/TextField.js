import React from 'react'
import MUITextField from '@material-ui/core/TextField'
import { Field } from 'redux-form'

const TextField = ({ name, label, type }) =>
  <Field name={name} label={label} type={type} component={renderTextField}/>

const renderTextField = ({ label, input, meta: { touched, invalid, error }, ...custom }) =>
  <MUITextField
    label={label}
    placeholder={label}
    error={Boolean(touched && invalid)}
    helperText={error}
    margin="dense"
    fullWidth
    {...input}
    {...custom}
  />

export default TextField
