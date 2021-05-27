import React, { memo } from 'react';

import { Article } from '../../Article/mobileview/Article';
import { NotFound } from '../../common/NotFound';

export const ArticleList = memo(function ArticleList({ articles }) {

  if (!Array.isArray(articles) || articles.length === 0) {
    return (<NotFound />)
  }
  return (<>
    {articles.map(article => (<div key={article.id}>
      <Article { ...article } />
    </div>))}
    <h1>Mobile View</h1>
  </>);
  
});
