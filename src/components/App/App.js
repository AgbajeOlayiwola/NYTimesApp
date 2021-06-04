import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import './App.scss';
import { AppHeader } from '../common/AppHeader.js'
import { AppFooter } from '../common/AppFooter.js';
import { ArticleDetails } from '../ArticleDetails/mobileview/ArticleDetails.js';
import { ArticleList } from '../ArticleList/mobileview/ArticleList';

function App() {
  const [articles, setArticles] = useState(null);
  const [size, setSize] = useState(window.innerWidth);
  const [isLoading, setIsLoading ] = useState(true)

//Asynchronous/await function to get api data
  const loadAsyncData = async () => {
    try {
      const response = await fetch ('https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/7.json?api-key=MJ4FfwRcFW2UD0b72IBaFxA0aFMnRafp')
      //nex lin json formats to recieved data from fetch() into objects we csn use
      const data = await response.json();
      const item = data.results;
      console.log('data from App', item)
      //set articles to items recieved from the above api
      setArticles(item);
      setIsLoading(false);
    } catch(e) {
      //catch any possible errors sert articles to nothing and isloading to false
      setArticles();
      console.log(e)
    }
    
  }
  //size function
  const handleResize=()=>{
    //set initial size
  setSize(window.innerWidth)
  }
useEffect(() => {
  //run asyc function when app renders
  loadAsyncData();




  window.addEventListener('resize', handleResize)
  //The cleanup to prevent repeatedly adding event listener
  return ()=>{
    window.removeEventListener('resize', handleResize)
  }
  //Dependency[] renders based on changes to the dependency neat
}, []);
//set window breakpoint
//const breakpoint = 600;
//a bunch of consoles
//console.log(size)
//console.log(breakpoint)
//console.log(isLoading)
return (
    <div>
   <AppHeader />
   {/*ternary for running spinner and articles */}
   {isLoading ? (<div className="text-center spinner-dark">
      <Spinner color="dark" />
    </div>) : 
    /*Routes array for ternary*/
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
