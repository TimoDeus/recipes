import React from 'react'
import { Form } from 'semantic-ui-react'
import { Field } from 'redux-form'
import * as PropTypes from 'prop-types'

const Select = ({ name, label, options }) =>
  <Field name={name} label={label} options={options} component={renderSelect}/>

const handleChange = inputOnChange => (e, { value }) => inputOnChange(value)

const renderSelect = ({ label, input, options }) =>
  <Form.Select
    label={label}
    options={options}
    value={input.value}
    onChange={handleChange(input.onChange)}
  />

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  })).isRequired,
}

export default Select
