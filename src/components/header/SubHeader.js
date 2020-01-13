import React from 'react'
import { connect } from 'react-redux'
import { TYPE_DESSERT, TYPE_MAIN, TYPE_PASTRIES } from '../../utils/constants'
import { withRouter } from 'react-router-dom'
import { getQueryParamsFromLocation, stringifyQueryParams } from '../../utils/utils'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import { messages } from '../../utils/messages'

const types = [TYPE_MAIN, TYPE_DESSERT, TYPE_PASTRIES]

class SubHeader extends React.Component {

  handleTypeChange = (event, type) => {
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
    const { recipes } = this.props
    const activeTab = this.getActiveTab()

    return (
      <AppBar position="static" color="default">
        <Tabs
          value={activeTab}
          onChange={this.handleTypeChange}
          scrollButtons="auto"
          variant="scrollable"
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {Object.keys(recipes).length !== 0 && types.map(t => (
            <Tab
              value={t}
              label={<span>{messages[t]} <b>({recipes[t].length})</b></span>}
              key={t}
              disabled={!recipes[t].length}
            />
          ))}
        </Tabs>
      </AppBar>
    )
  }
}

const mapStateToProps = ({ recipes }) => ({
  recipes
})

export default withRouter(connect(mapStateToProps, null)(SubHeader))
