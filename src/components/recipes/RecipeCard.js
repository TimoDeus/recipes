import React, { Component } from 'react'
import { Button, Card, Grid, Icon, Placeholder } from 'semantic-ui-react'
import * as PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { filterByTags } from '../../actions/filter'
import { connect } from 'react-redux'
import './RecipeCard.css'
import { deleteRecipe } from '../../actions/recipes'
import ConfirmationButton from './ConfirmationButton'
import { getQueryParamsFromLocation } from '../../utils/queryString'

class RecipeCard extends Component {

  wrapSearchText (text) {
    const { location } = this.props
    const { query } = getQueryParamsFromLocation(location)
    const value = query && query.length > 2 ? text.replace(new RegExp('(' + query.trim() + ')', 'gi'), '<em>$1</em>') : text
    return <span dangerouslySetInnerHTML={{ __html: value }}/>
  }

  printTags (tags, clickHandler) {
    return tags.map(s => s.trim())
      .map((value, idx) =>
        <Button key={idx} size='mini' compact onClick={() => clickHandler(value)}>
          {this.wrapSearchText(value)}
        </Button>
      )
  }

  render () {
    const { recipe, onTagClicked, auth, onDelete } = this.props
    const isAuthenticated = Boolean(auth.token)
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
              {this.printTags(recipe.tags, onTagClicked)}
            </Card.Meta>
            {this.wrapSearchText(recipe.shortDescription)}
          </Card.Content>
          {isAuthenticated &&
          <Card.Content extra>
            <Link to={`/editRecipe/${recipe._id}`}><Icon name="edit"/></Link>
            <ConfirmationButton compact size='mini' floated='right' icon={{ name: 'trash alternate' }}
                                content={`Rezept '${recipe.title}' löschen?`} onConfirm={() => onDelete(recipe._id)}/>
          </Card.Content>
          }
        </Card>
      </Grid.Column>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onTagClicked: value => dispatch(filterByTags(value)),
  onDelete: recipeId => dispatch(deleteRecipe(recipeId)),
})

const mapStateToProps = ({ filter, auth }) => ({
  query: filter.query,
  auth
})

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
  onTagClicked: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  query: PropTypes.string,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeCard))
