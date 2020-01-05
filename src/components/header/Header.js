import React from 'react'
import { Container, Icon, Input, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import qs from 'qs'
import { getQueryParamsFromLocation } from '../../utils/queryString'
import { fetchRecipes } from '../../actions/recipes'

class Header extends React.Component {

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
    history.push(`${location.pathname}?${qs.stringify(queryParams)}`)
    this.setState({ query: value })
    this.props.updateFilter(value)
  }

  render () {
    const { showSearch = true } = this.props
    return (
      <Container>
        <Menu inverted>
          <Menu.Item header>
            <Link to="/">
              <Icon name='food' style={{ marginRight: '1.5em' }}/>
              Rezepte
            </Link>
          </Menu.Item>
          {showSearch && (
            <Menu.Menu position='right'>
              <Menu.Item>
                <Input icon='search' placeholder='Suche...' onChange={this.handleSearch}
                       value={this.state.query || ''}/>
              </Menu.Item>
            </Menu.Menu>
          )}
        </Menu>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch, { location }) => ({
  updateFilter: () => dispatch(fetchRecipes(getQueryParamsFromLocation(location)))
})

const mapStateToProps = ({ recipes }) => ({
  recipes
})

Header.propTypes = {
  updateFilter: PropTypes.func.isRequired,
  showSearch: PropTypes.bool
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
