import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import { Route, Switch } from 'react-router'
import RecipeList from './recipes/RecipeList'
import NotFoundPage from './NotFoundPage'
import CreateRecipeForm from './forms/CreateRecipeForm'

class App extends Component {
  render () {
    return (
      <Container>
        <Switch>
          <Route exact path="/" component={RecipeList}/>
          <Route path="/addRecipe" component={CreateRecipeForm}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </Container>
    )
  }
}

export default App
