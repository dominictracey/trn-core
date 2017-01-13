import React from 'react';
import { withRouter } from 'react-router';
import { Components, replaceComponent } from 'meteor/nova:lib';

const TrnPostsListHeader = ({router}, context) => {
  const currentCategorySlug = router.location.query.cat;
  
  return (
    <div>
      {currentCategorySlug ? <Components.CategoriesBar slug={currentCategorySlug} /> : null}
      <div className="posts-list-header">
        <Components.PostsViews />
        <Components.SearchForm/>
      </div>
    </div>
  )
}

TrnPostsListHeader.displayName = "TrnPostsListHeader";

replaceComponent('PostsListHeader', TrnPostsListHeader, withRouter);
