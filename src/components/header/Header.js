import React from 'react'
import { Container, Icon, Input, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { filterByQuery } from '../../actions/filter'
import * as PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import qs from 'qs'

const MIN_QUERY_LENGTH = 3

class Header extends React.Component {

  state = {
    query: undefined
  }

  componentDidMount () {
    const { location: { search } } = this.props
    const queryParams = qs.parse(search.substr(1))
    this.setState({ query: queryParams.query })
    this.props.updateFilter(queryParams.query)
  }

  handleSearch = ({ target: { value } }) => {
    const { history, location: { pathname, search } } = this.props
    const queryParams = qs.parse(search.substr(1))
    queryParams.query = value && value.length ? value : undefined
    history.push(`${pathname}?${qs.stringify(queryParams)}`)
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

const mapDispatchToProps = dispatch => ({
  updateFilter: query => {
    if (query && query.length >= MIN_QUERY_LENGTH) {
      dispatch(filterByQuery(query))
    }
  }
})

const mapStateToProps = ({ recipes }) => ({
  recipes
})

Header.propTypes = {
  updateFilter: PropTypes.func.isRequired,
  showSearch: PropTypes.bool
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
