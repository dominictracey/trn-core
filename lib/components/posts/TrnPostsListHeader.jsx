import { Components, replaceComponent } from 'meteor/nova:lib';
import React from 'react';

const TrnPostsListHeader = () => {

  return (
    <div>
      <div className="posts-list-header">
        <Components.PostsViews />
        <Components.SearchForm/>
      </div>
    </div>
  )
}

TrnPostsListHeader.displayName = "TrnPostsListHeader";

replaceComponent('PostsListHeader', TrnPostsListHeader);
