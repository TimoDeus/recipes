import React from 'react'
import { connect } from 'react-redux'
import * as PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { getQueryParamsFromLocation, stringifyQueryParams } from '../../utils/utils'
import { fetchRecipes } from '../../actions/recipes'
import Header from './Header'
import LoginDialog from '../auth/LoginDialog'
import { logout } from '../../actions/auth'

class HeaderContainer extends React.Component {

  state = {
    query: undefined,
    loginDialogOpen: false
  }

  componentDidMount () {
    const { location } = this.props
    const { query } = getQueryParamsFromLocation(location)
    this.setState({ query })
  }

  handleSearch = ({ target: { value } }) => {
    const { history, location } = this.props
    const queryParams = { ...getQueryParamsFromLocation(location) }
    queryParams.query = value && value.length ? value : undefined
    history.push(`/?${stringifyQueryParams(queryParams)}`)
    this.setState({ query: value })
    this.props.updateFilter(queryParams)
  }

  openLoginDialog = () => this.setState({ loginDialogOpen: true })
  closeLoginDialog = () => this.setState({ loginDialogOpen: false })
  resetFilter = () => {
    this.setState({ query: undefined })
    this.props.updateFilter({})
  }

  render () {
    return <div>
      <Header
        handleSearch={this.handleSearch}
        isAuthenticated={this.props.isAuthenticated}
        query={this.state.query || ''}
        openLoginDialog={this.openLoginDialog}
        onLogout={this.props.logout}
        resetFilter={this.resetFilter}
      />
      <LoginDialog
        open={this.state.loginDialogOpen}
        onClose={this.closeLoginDialog}
      />
    </div>
  }
}

const mapDispatchToProps = dispatch => ({
  updateFilter: queryParams => dispatch(fetchRecipes(queryParams)),
  logout: () => dispatch(logout())
})

const mapStateToProps = ({ recipes, auth: { username } }) => ({
  recipes,
  isAuthenticated: Boolean(username)
})

HeaderContainer.propTypes = {
  updateFilter: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderContainer))
