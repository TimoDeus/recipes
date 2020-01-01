import React, { Component } from 'react'
import ReactRTE from 'react-rte'

const contentType = 'html'

class RichTextEditor extends Component {

  constructor (props) {
    super(props)
    this.state = {
      value: this.props.input.value === '' ?
        ReactRTE.createEmptyValue() :
        ReactRTE.createValueFromString(this.props.input.value, contentType)
    }
  }

  componentWillReceiveProps (nextProps, nextContext) {
    if (nextProps.input.value !== this.state.value.toString(contentType)) {
      this.setState({
        value: nextProps.input.value ?
          ReactRTE.createValueFromString(nextProps.input.value, contentType) :
          ReactRTE.createEmptyValue()
      })
    }
  }

  onChange = value => {
    this.setState({ value }, () => this.props.input.onChange(value.toString(contentType)))
  }

  render () {
    return (
      <ReactRTE value={this.state.value} onChange={this.onChange}/>
    )
  }
}

export default RichTextEditor
