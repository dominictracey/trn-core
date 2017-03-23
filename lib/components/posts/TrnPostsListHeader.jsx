import React from 'react';
import { withRouter } from 'react-router';
import { Components, replaceComponent } from 'meteor/vulcan:core';

const TrnPostsListHeader = ({router}) => {
  const onCategoryRoutes = router.params.categoryType && router.params.slug;

  return (
    <div>
      {onCategoryRoutes ? <Components.CategoriesBar slug={router.params.slug} /> : null}
      <div className="posts-list-header">
        <Components.PostsViews />
        <Components.SearchForm/>
      </div>
    </div>
  )
}

TrnPostsListHeader.displayName = "TrnPostsListHeader";

replaceComponent('PostsListHeader', TrnPostsListHeader, withRouter);
