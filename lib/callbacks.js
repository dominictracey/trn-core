/*
Let's add a callback to the new post method that
appends a random emoji to the newly submitted post's title.
*/
import { addCallback } from 'meteor/nova:core';

function PostsNewAddMatchThread (post, user) {
  if (post.postType === 'match') {
    post.title = '[Match Thread]: ' + post.title
  }

  return post;
}

//addCallback("posts.new.sync", PostsNewAddMatchThread);
