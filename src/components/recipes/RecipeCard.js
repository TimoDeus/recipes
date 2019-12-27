import React, { Component } from 'react'
import { Button, Card, Grid, Placeholder } from 'semantic-ui-react'
import * as PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { filterByLabel } from '../../actions/filter'
import { connect } from 'react-redux'
import './RecipeCard.css'

class RecipeCard extends Component {

  wrapSearchText (text) {
    const { freetext } = this.props
    const value = freetext && freetext.length > 2 ? text.replace(new RegExp('(' + freetext.trim() + ')', 'gi'), '<em>$1</em>') : text
    return <span dangerouslySetInnerHTML={{ __html: value }}/>
  }

  printLabels (labels, clickHandler) {
    return labels.map(s => s.trim())
      .map((value, idx) =>
        <Button key={idx} size='mini' compact onClick={() => clickHandler(value)}>
          {this.wrapSearchText(value)}
        </Button>
      )
  }

  render () {
    const { recipe, onLabelClicked } = this.props
    return (
      <Grid.Column>
        <Card fluid color='blue'>
          <Placeholder fluid>
            <Placeholder.Image/>
          </Placeholder>
          <Card.Content>
            <Card.Header>
              {this.wrapSearchText(recipe.title)}
            </Card.Header>
            <Card.Meta>
              {this.printLabels(recipe.labels, onLabelClicked)}
            </Card.Meta>
            {this.wrapSearchText(recipe.shortDescription)}
          </Card.Content>
          <Card.Content extra>
            <Button compact size='mini' floated='right' icon={{name: 'edit'}} />
            <Button compact size='mini' floated='right' icon={{name: 'trash alternate'}} />
          </Card.Content>
        </Card>
      </Grid.Column>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onLabelClicked: value => dispatch(filterByLabel(value)),
})

const mapStateToProps = ({ filter }) => ({
  freetext: filter.freetext
})

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
  onLabelClicked: PropTypes.func.isRequired,
  freetext: PropTypes.string,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeCard))
