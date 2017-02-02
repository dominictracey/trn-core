import { Components, registerComponent } from 'meteor/nova:core';
import React from 'react';
//import Posts from "meteor/nova:posts";

const PostsSingle = (props, context) => {
  return <Components.PostsPage slug={props.params.slug} />
};

PostsSingle.displayName = "PostsSingle";

registerComponent('PostsSingle', PostsSingle);
