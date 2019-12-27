import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import * as PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LoginForm from '../forms/LoginForm'

class Login extends React.Component {

  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render () {
    return (
      <Modal trigger={<Button onClick={this.handleOpen}>Login</Button>}
             open={this.state.modalOpen}
             onClose={this.handleClose}
             closeIcon>
        <Header icon='user' content='Login'/>
        <Modal.Content>
          <LoginForm/>
        </Modal.Content>
      </Modal>
    )
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = ({ auth }) => ({
  auth
})

export default connect(mapStateToProps)(Login)
