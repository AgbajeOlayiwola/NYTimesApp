import React, { Fragment, memo } from 'react';

import { NotFound } from '../../common/NotFound';
import { ArticlePC } from '../../Article/pcview';
import './style.css'

export const ArticleListPc = memo(function ArticleListPc({ articles }) {
  
  if (!Array.isArray(articles) || articles.length === 0) {
    return (<NotFound />)
  }
  return (
  <div className='ArticleList_component'>
    {articles.map(article => (<div key={article.id}>
      <ArticlePC { ...article } />
    </div>))}
  </div>);
});