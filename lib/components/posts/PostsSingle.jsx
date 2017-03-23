import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
//import Posts from "meteor/vulcan:posts";

const PostsSingle = (props, context) => {
  return <Components.PostsPage slug={props.params.slug} />
};

PostsSingle.displayName = "PostsSingle";

registerComponent('PostsSingle', PostsSingle);
