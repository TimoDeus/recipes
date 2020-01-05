import React from 'react'
import { connect } from 'react-redux'
import * as PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { getQueryParamsFromLocation, stringifyQueryParams } from '../../utils/queryString'
import { fetchRecipes } from '../../actions/recipes'
import Header from '../../components/header/Header'

class HeaderContainer extends React.Component {

  state = {
    query: undefined
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const { location } = this.props
    const { query } = getQueryParamsFromLocation(location)
    if (prevState.query !== query) {
      this.setState({ query })
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

  render () {
    return <Header
      handleSearch={this.handleSearch}
    />
  }
}

const mapDispatchToProps = (dispatch, { location }) => ({
  updateFilter: () => dispatch(fetchRecipes(getQueryParamsFromLocation(location)))
})

const mapStateToProps = ({ recipes }) => ({
  recipes
})

HeaderContainer.propTypes = {
  updateFilter: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderContainer))
