import React from 'react'
import { Container, Icon, Input, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { filterByQuery } from '../../actions/filter'
import * as PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Header = props => {
  const { filter, showSearch = true } = props
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
              <Input icon='search' placeholder='Suche...' onChange={props.onSearch} value={filter.query || ''}/>
            </Menu.Item>
          </Menu.Menu>
        )}
      </Menu>
    </Container>
  )
}

const mapDispatchToProps = dispatch => ({
  onSearch: e => dispatch(filterByQuery(e.target.value)),
})

const mapStateToProps = ({ filter, recipes }) => ({
  filter,
  recipes
})

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
  showSearch: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
