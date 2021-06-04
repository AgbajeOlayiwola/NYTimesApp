import React, { memo } from 'react';

import { Article } from '../../Article/mobileview/Article';
import { NotFound } from '../../common/NotFound';
import { ArticlePC } from '../../Article/pcview';
import '../pcview/style.css'

export const ArticleList = memo(function ArticleList({ articles, size}){

  if (!Array.isArray(articles) || articles.length === 0) {
    return (<NotFound />)
  }
  return (
    /*ternary operator to render ui based on screen size */
    (size <= 600 ?
    <>
    {articles.map(article => (<div /*unique keys */key={article.id}>
      <Article { ...article } />
    </div>))}
    </>
  :
    (<div className='ArticleList_component'>
    {articles.map(article => (<div key={article.id}>
      <ArticlePC { ...article } />
    </div>))}
  </div>)
))})
