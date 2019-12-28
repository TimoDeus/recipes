import React, { Component } from 'react'
import ReactRTE from 'react-rte'

class RichTextEditor extends Component {

  constructor (props) {
    super(props)
    this.state = {
      value: this.props.input.value === '' ?
        ReactRTE.createEmptyValue() :
        ReactRTE.createValueFromString(this.props.input.value, 'html')
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.input.value !== this.state.value.toString('html')) {
      this.setState({
        value: nextProps.input.value ?
          ReactRTE.createValueFromString(nextProps.input.value, 'html') :
          ReactRTE.createEmptyValue()
      })
    }
  }

  onChange (value) {
    const isTextChanged = this.state.value.toString('html') !== value.toString('html')
    this.setState({ value }, e => isTextChanged && this.props.input.onChange(value.toString('html')))
  };

  render () {
    return <ReactRTE value={this.state.value} onChange={this.onChange.bind(this)}/>
  }
}

export default RichTextEditor
