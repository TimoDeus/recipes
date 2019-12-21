import React from 'react'
import { Button, Container, Icon, Input, Label, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { filterByFreetext, filterByType, resetFilter } from '../../actions/filter'
import * as PropTypes from 'prop-types'
import { TYPE_PASTRIES, TYPE_DESSERT, TYPE_MAIN } from '../../utils/constants'
import { messages } from '../../utils/messages'

const types = [TYPE_MAIN, TYPE_DESSERT, TYPE_PASTRIES]

const Header = props => {
  const { onResetFilter, filter, recipes } = props
  const activeTab = filter.type
  const hasFilter = filter.labels || filter.freetext
  return (
    <Container>
      <Menu inverted>
        <Menu.Item header onClick={onResetFilter}>
          <Icon name='food' style={{ marginRight: '1.5em' }}/>
          Rezepte
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Suche...' onChange={props.onSearch} value={filter.freetext || ''}/>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Menu tabular>
        {Object.keys(recipes).length && types.map(t => (
          <Menu.Item active={activeTab === t} onClick={props.onTypeSelected(t)} key={t}>
            {messages[t]} <Label circular color='blue'>{recipes[t].length}</Label>
          </Menu.Item>)
        )}
        {hasFilter && (
          <Menu.Menu position='right'>
            <Menu.Item>
              <Button onClick={onResetFilter}>Filter zurücksetzen</Button>
            </Menu.Item>
          </Menu.Menu>
        )}
      </Menu>
    </Container>
  )
}

const mapDispatchToProps = dispatch => ({
  onResetFilter: () => dispatch(resetFilter()),
  onSearch: e => dispatch(filterByFreetext(e.target.value)),
  onTypeSelected: type => () => dispatch(filterByType(type)),
})

const mapStateToProps = ({ filter, recipes }) => ({
  filter,
  recipes
})

Header.propTypes = {
  onResetFilter: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onTypeSelected: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
