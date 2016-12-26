import Telescope from 'meteor/nova:lib';
import React from 'react';
import Posts from "meteor/nova:posts";
import MatchBody, { LinkBody } from './post-types'

const TrnPostsPage = ({document, currentUser}) => {

  const post = document;

  var body = {}
  if (!post.postType || post.postType === 'link') {
    body = <LinkBody post={post}/>
  } else if (post.postType === 'match') {
    body = <MatchBody post={post}/>
  }

  return (
    <div className="posts-page">

      <Telescope.components.HeadTags url={Posts.getLink(post)} title={post.title} image={post.thumbnailUrl} />

      <Telescope.components.PostsItem post={post}/>

      {body}

      {/*<SocialShare url={ Posts.getLink(post) } title={ post.title }/>*/}

      <Telescope.components.PostsCommentsThread document={post} />

    </div>
  )
};

TrnPostsPage.displayName = "TrnPostsPage";

module.exports = TrnPostsPage;
export default TrnPostsPage;
