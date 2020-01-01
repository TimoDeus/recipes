import React from 'react'
import { Button, Container, Label, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { resetFilter } from '../../actions/filter'
import * as PropTypes from 'prop-types'
import { TYPE_DESSERT, TYPE_MAIN, TYPE_PASTRIES } from '../../utils/constants'
import { messages } from '../../utils/messages'
import { Link, withRouter } from 'react-router-dom'
import Login from '../auth/Login'
import Logout from '../auth/Logout'
import qs from 'qs'

const types = [TYPE_MAIN, TYPE_DESSERT, TYPE_PASTRIES]

class SubHeader extends React.Component {

  handleTypeChange = type => () => {
    const { history, location: { pathname, search } } = this.props
    const queryParams = qs.parse(search.substr(1))
    queryParams.type = type
    history.push(`${pathname}?${qs.stringify(queryParams)}`)
  }

  getActiveTab = () => {
    const { location: { search } } = this.props
    return qs.parse(search.substr(1)).type || TYPE_MAIN
  }

  render () {
    const { onResetFilter, filter, recipes } = this.props
    const activeTab = this.getActiveTab()
    const hasFilter = filter.tags.length || filter.query
    const isAuthenticated = Boolean(this.props.auth.token)

    return (
      <Container>
        <Menu tabular>
          {Object.keys(recipes).length !== 0 && types.map(t => (
            <Menu.Item active={activeTab === t} onClick={this.handleTypeChange(t)} key={t}>
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
}

const mapDispatchToProps = dispatch => ({
  onResetFilter: () => dispatch(resetFilter())
})

const mapStateToProps = ({ filter, recipes, auth }) => ({
  filter,
  recipes,
  auth
})

SubHeader.propTypes = {
  onResetFilter: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubHeader))
