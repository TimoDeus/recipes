import React from 'react'
import { Container, Label, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { TYPE_DESSERT, TYPE_MAIN, TYPE_PASTRIES } from '../../utils/constants'
import { messages } from '../../utils/messages'
import { Link, withRouter } from 'react-router-dom'
import Login from '../auth/Login'
import Logout from '../auth/Logout'
import { getQueryParamsFromLocation, stringifyQueryParams } from '../../utils/queryString'

const types = [TYPE_MAIN, TYPE_DESSERT, TYPE_PASTRIES]

class SubHeader extends React.Component {

  handleTypeChange = type => () => {
    const { history, location } = this.props
    const queryParams = getQueryParamsFromLocation(location)
    queryParams.type = type
    history.push(`${location.pathname}?${stringifyQueryParams(queryParams)}`)
  }

  getActiveTab = () => {
    const { location } = this.props
    return getQueryParamsFromLocation(location).type || TYPE_MAIN
  }

  render () {
    const { recipes, location } = this.props
    const activeTab = this.getActiveTab()
    const {query, tags = []} = getQueryParamsFromLocation(location)
    const hasFilter = tags.length || query
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
                <Link to="/">Filter zurücksetzen</Link>
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

const mapStateToProps = ({ recipes, auth }) => ({
  recipes,
  auth
})

export default withRouter(connect(mapStateToProps, null)(SubHeader))
