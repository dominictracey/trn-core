import { registerComponent } from 'meteor/nova:lib';
import React from 'react';
import Categories from 'meteor/nova:categories';
import { Link } from 'react-router';

const TrnPostsCategories = ({post}) => {
  return (
    <div className="posts-categories">
      {post.categories.map(category => {
        
        // get the slug type of this category type thanks to a collection helper
        const {slug: slugType} = Categories.availableTypes.find(type => type.value === category.type);
        
        return (
          <Link 
            className="posts-category" 
            key={category._id} 
            to={{
              pathname: `/${slugType}/${category.slug}`,
            }}
          >
            {category.name}
          </Link>
        );
      })}
    </div>
  )
};

TrnPostsCategories.displayName = "TrnPostsCategories";

registerComponent('PostsCategories', TrnPostsCategories);
