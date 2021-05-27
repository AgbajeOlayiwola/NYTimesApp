import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import './App.scss';
import { AppHeader } from '../common/AppHeader.js'
import { AppFooter } from '../common/AppFooter.js';
import { ArticleDetails } from '../ArticleDetails/mobileview/ArticleDetails.js';
import Decider from '../ArticleList';
import { ArticleListPc } from '../ArticleList/pcview';
import { ArticleList } from '../ArticleList/mobileview/ArticleList';

/**
 *
 * @class App
 * @extends {Component}
 */

let limit = 800; 
console.log(limit)

class App extends Component {

state = { articles: [], isLoading: false }

/**
*
* @memberof App
*/
constructor(props) {
  super(props);
  this.state = { width: 0, height: 0 };
  this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
}


async componentDidMount() {
this.setState({ isLoading: true });
this.updateWindowDimensions();
window.addEventListener('resize', this.updateWindowDimensions);


try {
  const response = await axios.get('https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/7.json?api-key=MJ4FfwRcFW2UD0b72IBaFxA0aFMnRafp')
  this.setState({ articles: response.data.results, isLoading: false });

} catch (error) {
  this.setState({ articles: [], isLoading: false });
}
}

componentWillUnmount() {
  window.removeEventListener('resize', this.updateWindowDimensions);
}

updateWindowDimensions() {
  this.setState({ width: window.innerWidth, height: window.innerHeight });
}




render() {
const { articles, isLoading } = this.state;
const { width } = this.state; 
console.log(width)

return (
  <div className="App">
    <AppHeader />
    {isLoading ? (<div className="text-center spinner-dark">
      <Spinner color="dark" />
    </div>) :
      [(limit >= width )?
        <Route
          key="article-list-router"
          exact
          path='/'
          render={() => <ArticleList articles={articles} />}
        />:
        <Route
          key="article-list-router"
          exact
          path='/'
          render={() => <ArticleListPc articles={articles} />}
        />,
        <Route
          key="article-router"
          exact
          path='/:articleId'
          render={(matchProps) => <ArticleDetails articles={articles} {...matchProps} />}
        />,
        <Route
        key='decider box'
          exact
          path='/:articleId'
          render={(matchProps) => <Decider articles={articles} {...matchProps} />}
        /> 
      ]
    }
    <AppFooter />
  </div>
);
}
}

export default App;
