import { replaceComponent } from 'meteor/vulcan:core';
import React from 'react';
import Categories from 'meteor/vulcan:categories';
import { Link } from 'react-router';

const TrnPostsCategories = ({post}) => {
  return (
    <div className="posts-categories">
      {post.categories.map(category => {

        const pathname = Categories.getUrl(category);

        return (
          <Link
            className="posts-category"
            key={category._id}
            to={{pathname}}
          >
            {category.name}
          </Link>
        );
      })}
    </div>
  )
};

TrnPostsCategories.displayName = "TrnPostsCategories";

replaceComponent('PostsCategories', TrnPostsCategories);
