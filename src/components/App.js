import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import Header from './header/Header';
import RecipeList from './recipes/RecipeList';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header/>
				<RecipeList/>
			</div>
		);
	}
}

export default App;
