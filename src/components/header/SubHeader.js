import React from 'react'
import { Button, Container, Label, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { filterByType, resetFilter } from '../../actions/filter'
import * as PropTypes from 'prop-types'
import { TYPE_DESSERT, TYPE_MAIN, TYPE_PASTRIES } from '../../utils/constants'
import { messages } from '../../utils/messages'

const types = [TYPE_MAIN, TYPE_DESSERT, TYPE_PASTRIES]

const SubHeader = props => {
  const { onResetFilter, filter, recipes } = props
  const activeTab = filter.type
  const hasFilter = filter.labels.length || filter.freetext
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
      </Menu>
    </Container>
  )
}

const mapDispatchToProps = dispatch => ({
  onResetFilter: () => dispatch(resetFilter()),
  onTypeSelected: type => () => dispatch(filterByType(type)),
})

const mapStateToProps = ({ filter, recipes }) => ({
  filter,
  recipes
})

SubHeader.propTypes = {
  onResetFilter: PropTypes.func.isRequired,
  onTypeSelected: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SubHeader)
