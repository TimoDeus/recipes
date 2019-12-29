import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { Field } from 'redux-form'
import * as PropTypes from 'prop-types'

class LabelSelector extends Component {

  handleAddition = (e, { value }) => this.props.onAddLabel(value)

  handleChange = inputOnChange => (e, { value }) => inputOnChange(value)

  handleBlur = inputOnBlur => (e, { value }) => inputOnBlur(value)

  renderDropdown = fieldProps => {

    const { input, meta: { touched, invalid, error }, ...custom } = fieldProps
    const { label, labels } = this.props
    return <Form.Dropdown
      {...input}
      {...custom}
      label={label}
      placeholder={label}
      error={touched && invalid && error && { content: error }}
      options={convertLabelsToOptions(labels)}
      search
      selection
      multiple
      allowAdditions
      onAddItem={this.handleAddition}
      onChange={this.handleChange(input.onChange)}
      onBlur={this.handleBlur(input.onBlur)}
    />
  }

  render () {
    const { name, label } = this.props
    return <Field name={name} label={label} component={this.renderDropdown} type="select-multiple"/>
  }
}

const convertLabelsToOptions = (labels = []) => {
  return labels.reduce((aggr, curr) => {
    aggr.push({key: curr, value: curr, text: curr})
    return aggr
  }, [])
}

LabelSelector.propTypes = {
  onAddLabel: PropTypes.func.isRequired,
  labels: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default LabelSelector
