import React from 'react'
import { Button, Container, Label, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { filterByType, resetFilter } from '../../actions/filter'
import * as PropTypes from 'prop-types'
import { TYPE_DESSERT, TYPE_MAIN, TYPE_PASTRIES } from '../../utils/constants'
import { messages } from '../../utils/messages'
import { Link } from 'react-router-dom'
import Login from '../auth/Login'
import Logout from '../auth/Logout'

const types = [TYPE_MAIN, TYPE_DESSERT, TYPE_PASTRIES]

const SubHeader = props => {
  const { onResetFilter, filter, recipes } = props
  const activeTab = filter.type
  const hasFilter = filter.tags.length || filter.query
  const isAuthenticated = Boolean(props.auth.token)
  return (
    <Container>
      <Menu tabular>
        {Object.keys(recipes).length !== 0 && types.map(t => (
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
        <Menu.Menu position='right'>
          {isAuthenticated && <Menu.Item>
            <Link to="/addRecipe">Hinzufügen</Link>
          </Menu.Item>
          }
          <Menu.Item>
            {!isAuthenticated ? <Login/> : <Logout/>}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Container>
  )
}

const mapDispatchToProps = dispatch => ({
  onResetFilter: () => dispatch(resetFilter()),
  onTypeSelected: type => () => dispatch(filterByType(type)),
})

const mapStateToProps = ({ filter, recipes, auth }) => ({
  filter,
  recipes,
  auth
})

SubHeader.propTypes = {
  onResetFilter: PropTypes.func.isRequired,
  onTypeSelected: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SubHeader)
