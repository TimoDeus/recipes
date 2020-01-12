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

  componentDidUpdate (prevProps, prevState, snapshot) {
    const { location } = this.props
    const { query } = getQueryParamsFromLocation(location)
    if (prevState.query && !query) {
      this.setState({ query: undefined })
      this.props.updateFilter(query)
    }
  }

  handleSearch = ({ target: { value } }) => {
    const { history, location } = this.props
    const queryParams = getQueryParamsFromLocation(location)
    queryParams.query = value && value.length ? value : undefined
    history.push(`/?${stringifyQueryParams(queryParams)}`)
    this.setState({ query: value })
    this.props.updateFilter(value)
  }

  openLoginDialog = () => this.setState({ loginDialogOpen: true })
  closeLoginDialog = () => this.setState({ loginDialogOpen: false })
  redirectToRecipeForm = () => this.props.history.push('/addRecipe')

  render () {
    return <div>
      <Header
        handleSearch={this.handleSearch}
        username={this.props.username}
        query={this.state.query || ''}
        openLoginDialog={this.openLoginDialog}
        onLogout={this.props.logout}
        redirectToRecipeForm={this.redirectToRecipeForm}
      />
      <LoginDialog
        open={this.state.loginDialogOpen}
        onClose={this.closeLoginDialog}
      />
    </div>
  }
}

const mapDispatchToProps = (dispatch, { location }) => ({
  updateFilter: () => dispatch(fetchRecipes(getQueryParamsFromLocation(location))),
  logout: () => dispatch(logout())
})

const mapStateToProps = ({ recipes, auth: { username } }) => ({
  recipes,
  username
})

HeaderContainer.propTypes = {
  updateFilter: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  username: PropTypes.string
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderContainer))
