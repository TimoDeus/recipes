import React, { Component } from 'react'
import ReactRTE from 'react-rte'
import { Field } from 'redux-form'
import * as PropTypes from 'prop-types'

const contentType = 'html'

const createEditorValue = value => value !== 'undefined' ? ReactRTE.createEmptyValue() : ReactRTE.createValueFromString(value, contentType)

class RichTextEditor extends Component {

  constructor (props) {
    super(props)
    this.state = {
      value: createEditorValue(this.props.value)
    }
  }

  onChange = inputOnChange => value => {
    this.setState({ value }, () => inputOnChange(value.toString(contentType)))
  }

  renderComponent = fieldProps => {
    return <ReactRTE value={this.state.value} onChange={this.onChange(fieldProps.input.onChange)}/>
  }

  render () {
    const { name, label } = this.props
    return <Field name={name} label={label} component={this.renderComponent}/>
  }
}

RichTextEditor.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
}

export default RichTextEditor
