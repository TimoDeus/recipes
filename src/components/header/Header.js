import React from 'react'
import { Container, Icon, Input, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { filterByFreetext } from '../../actions/filter'
import * as PropTypes from 'prop-types'

const Header = props => {
  const { onResetFilter, filter, showSearch = true } = props
  return (
    <Container>
      <Menu inverted>
        <Menu.Item header onClick={onResetFilter}>
          <Icon name='food' style={{ marginRight: '1.5em' }}/>
          Rezepte
        </Menu.Item>
        {showSearch && (
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Suche...' onChange={props.onSearch} value={filter.freetext || ''}/>
          </Menu.Item>
        </Menu.Menu>
        )}
      </Menu>
    </Container>
  )
}

const mapDispatchToProps = dispatch => ({
  onSearch: e => dispatch(filterByFreetext(e.target.value)),
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
