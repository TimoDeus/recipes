import React from 'react'
import { Button } from 'semantic-ui-react'
import * as PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'

class Logout extends React.Component {
  render () {
    return (
      <Button onClick={this.props.onLogout}>Logout</Button>
    )
  }
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout())
})

export default connect(null, mapDispatchToProps)(Logout)
