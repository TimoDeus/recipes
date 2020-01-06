import React, { Component } from 'react'
import { Button, Card, Icon, Placeholder } from 'semantic-ui-react'
import * as PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './RecipeCard.css'
import { deleteRecipe, fetchRecipes } from '../../actions/recipes'
import ConfirmationButton from './ConfirmationButton'
import { getQueryParamsFromLocation, stringifyQueryParams } from '../../utils/queryString'
import Grid from '@material-ui/core/Grid'

class RecipeCard extends Component {

  wrapSearchText (text) {
    const { location } = this.props
    const { query } = getQueryParamsFromLocation(location)
    const value = query && query.length > 2 ? text.replace(new RegExp('(' + query.trim() + ')', 'gi'), '<em>$1</em>') : text
    return <span dangerouslySetInnerHTML={{ __html: value }}/>
  }

  tagClickHandler = value => () => {
    const { history, location } = this.props
    const queryParams = getQueryParamsFromLocation(location)
    let { tags = [] } = queryParams
    if (!Array.isArray(tags)) {
      tags = [tags]
    }
    if (!tags.includes(value)) {
      tags.push(value)
    } else {
      tags = tags.filter(t => t !== value)
    }
    queryParams.tags = tags
    history.push(`${location.pathname}?${stringifyQueryParams(queryParams)}`)
    this.props.onTagClicked(queryParams)
  }

  printTags = tags => {
    return tags.map(s => s.trim())
      .map((value, idx) =>
        <Button key={idx} size='mini' compact onClick={this.tagClickHandler(value)}>
          {this.wrapSearchText(value)}
        </Button>
      )
  }

  render () {
    const { recipe, auth, onDelete } = this.props
    const isAuthenticated = Boolean(auth.token)
    return (
      <Grid item xs={12} sm={6}>
        <Card fluid color='blue'>
          <Placeholder fluid>
            <Placeholder.Image/>
          </Placeholder>
          <Card.Content>
            <Card.Header>
              {this.wrapSearchText(recipe.title)}
            </Card.Header>
            <Card.Meta>
              {this.printTags(recipe.tags)}
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
      </Grid>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  onTagClicked: params => dispatch(fetchRecipes(params)),
  onDelete: recipeId => dispatch(deleteRecipe(recipeId)),
})

const mapStateToProps = ({ auth }) => ({
  auth
})

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
  onTagClicked: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeCard))
