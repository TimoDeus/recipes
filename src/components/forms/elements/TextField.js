import React from 'react'
import MUITextField from '@material-ui/core/TextField'
import { Field } from 'redux-form'

const TextField = ({ name, label, type, multiline }) =>
  <Field name={name} label={label} type={type} multiline={multiline} component={renderTextField}/>

const renderTextField = ({ label, input, meta: { touched, invalid }, ...custom }) =>
  <MUITextField
    label={label}
    placeholder={label}
    error={Boolean(touched && invalid)}
    helperText='&nbsp;'
    margin="dense"
    fullWidth
    {...input}
    {...custom}
  />

export default TextField
