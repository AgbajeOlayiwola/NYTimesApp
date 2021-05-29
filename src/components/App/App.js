import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import './App.scss';
import { AppHeader } from '../common/AppHeader.js'
import { AppFooter } from '../common/AppFooter.js';
import { ArticleDetails } from '../ArticleDetails/mobileview/ArticleDetails.js';
import { ArticleList } from '../ArticleList/mobileview/ArticleList';

function App() {

  let [articles, setArticles] = useState(null);
  const [size, setSize] = useState(window.innerWidth);
  const [isLoading, setIsLoading ] = useState(true)
 


  const loadAsyncData = async () => {
  
    setIsLoading(true);
    
    try {
      const response = await fetch('https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/7.json?api-key=MJ4FfwRcFW2UD0b72IBaFxA0aFMnRafp')
      const data = await response.json();
      const item = data.results;
      setArticles(item);
      setIsLoading(false);
    } catch(e) {
      setIsLoading(false);
      setArticles();
    }
    
  }
useEffect(async() => {
  setIsLoading(true);
  loadAsyncData();

  //api call in useEffect hook
  /*const response = await fetch('https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/7.json?api-key=MJ4FfwRcFW2UD0b72IBaFxA0aFMnRafp')
  const data = await response.json();
  const item = data.results;
  
  setArticles(item);
  setIsLoading(false)*/

//size thing
  const handleResize=()=>{
  setSize(window.innerWidth)
  return ()=>{
    window.removeEventListener('resize', handleResize)
  }
  }
  window.addEventListener('resize', handleResize)
}, []);

const breakpoint = 600;
console.log(size)
console.log(breakpoint)
console.log(isLoading)
return (
    <div>
   <AppHeader />
   {isLoading ? (<div className="text-center spinner-dark">
      <Spinner color="dark" />
    </div>) : 
      [
        <Route
          key="article-list-router"
          exact
          path='/'
          render={() => <ArticleList articles={articles} size={size} />}
      />,
        <Route
          key="article-router"
          exact
          path='/:articleId'
          render={(matchProps) => <ArticleDetails articles={articles} {...matchProps} size={size}/>}
        />
      ]
    }
    <AppFooter />  
    </div>
  );
}


export default App
