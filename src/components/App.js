import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Route, Switch } from 'react-router-dom'
import RecipeList from './recipes/RecipeList'
import NotFoundPage from './NotFoundPage'
import CreateRecipeForm from './forms/CreateRecipeForm'
import EditRecipeForm from './forms/EditRecipeForm'
import HeaderContainer from './header/HeaderContainer'
import Container from '@material-ui/core/Container'
import RecipeContainer from './recipes/RecipeContainer'

class App extends Component {
  render () {
    return (
      <Container>
        <HeaderContainer/>
        <Switch>
          <Route exact path="/" component={RecipeList}/>
          <Route path="/addRecipe" component={CreateRecipeForm}/>
          <Route path="/editRecipe/:recipeId" component={EditRecipeForm}/>
          <Route path="/:title" component={RecipeContainer}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </Container>
    )
  }
}

export default App
