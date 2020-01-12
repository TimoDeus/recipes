import React from 'react'
import { Field } from 'redux-form'
import * as PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MUISelect from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import { messages } from '../../../utils/messages'

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 120,
  },
}))

const Select = ({ name, label, options }) => {
  const classes = useStyles()
  return <Field name={name} label={label} options={options} classes={classes} component={renderSelect}/>
}

const handleChange = inputOnChange => ({ target: { value } }) => inputOnChange(value)

const renderSelect = ({ label, input, options, classes }) =>
  <FormControl className={classes.formControl}>
    <InputLabel>{label}</InputLabel>
    <MUISelect
      value={input.value}
      onChange={handleChange(input.onChange)}
    >
      {options.map(o => <MenuItem key={o} value={o}>{messages[o]}</MenuItem>)}
    </MUISelect>
  </FormControl>

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired
}

export default Select
