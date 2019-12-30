import React from 'react'
import { Button, Confirm, Container } from 'semantic-ui-react'
import * as PropTypes from 'prop-types'

class ConfirmationButton extends React.Component {

  state= {
    open: false
  }

  show = () => this.setState({ open: true })
  handleConfirm = () => this.setState({ open: false }, () => this.props.onConfirm())
  handleCancel = () => this.setState({ open: false })

  render () {
    const {content, onConfirm, ...rest} = this.props
    return (
      <Container>
        <Button onClick={this.show} {...rest} />
        <Confirm
          open={this.state.open}
          content={content}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </Container>
    )
  }
}

ConfirmationButton.propTypes = {
  content: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
}


export default ConfirmationButton
